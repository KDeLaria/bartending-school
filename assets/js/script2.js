//Need to figure out what to do with more ingredients than measure.  Hide non-populated blocks.
var drinkName;
var instructions;
var glass;
var thumbnail;
var ingredients = [];
var measurements = [];
var drinkObject = {
  drinkName,
  instructions,
  glass,
  thumbnail,
  ingredients,
  measurements,
};

//grab drinkID from URL
var indexTwoURL = window.location.href;
var cocktailIDArray = indexTwoURL.split("?");
var drinkId = cocktailIDArray[1];

console.log(drinkId);

async function getDrink(drinkId) {
  var drinkUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;

  await fetch(drinkUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      drinkObject = data.drinks[0];
      drinkName = drinkObject.strDrink;
      instructions = drinkObject.strInstructions;
      glass = drinkObject.strGlass;
      thumbnail = drinkObject.strDrinkThumb;
      ingredients.length = 0;
      measurements.length = 0;

      for (i = 0; i < 15; i++) {
        let strIngredient = "strIngredient" + (i + 1);
        if (drinkObject[strIngredient]) {
          ingredients.push(drinkObject[strIngredient].toLowerCase());
        }
      }

      for (i = 0; i < 15; i++) {
        let strMeasure = "strMeasure" + (i + 1);
        if (drinkObject[strMeasure]) {
          measurements.push(drinkObject[strMeasure] + " ");
        }
      }

      // JP assign the variables to the drinkObject
      drinkObject.drinkId = drinkId;
      drinkObject.drinkName = drinkName;
      drinkObject.instructions = instructions;
      drinkObject.glass = glass;
      drinkObject.thumbnail = thumbnail;
      drinkObject.ingredients = ingredients;
      drinkObject.measurements = measurements;
    });
  $("#drink-name").text(drinkObject.drinkName);
  $("#drink-image").attr("src", drinkObject.thumbnail);

  generateIngredients(drinkObject);
}

getDrink(drinkId);

function generateIngredients(drinkObject) {
  $("#drink-name").text(drinkObject.drinkName);
  $("#glass").text(drinkObject.glass);
  $("#instructions").text(drinkObject.instructions);
  $("#thumbnail").attr("src", drinkObject.thumbnail);

  for (let i = 0; i < drinkObject.ingredients.length; i++) {
    $("#step" + i).text(
      (drinkObject.measurements[i] || "") + drinkObject.ingredients[i]
    );
  }
}

window.onload = function () {
  document.getElementById("downloadPdf").addEventListener("click", function () {
    generatePdf();
  });
};

function generatePdf() {
  var element = document.querySelector(".container");
  var opt = {
    filename: drinkObject.drinkName + " Recipe Card.pdf",
  }
  html2pdf(element, opt);
}
