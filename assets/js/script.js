var hintEl = $('#hintText');

// list of drink IDs
const drinkList = [
  11728, 17827, 17186, 17250, 17180, 11324, 11003, 15941, 17185, 17218, 11423,
  12101, 13621, 11002, 11006, 178317, 11008, 17251, 17247, 11720, 11001, 12127,
  12196, 11202, 17196, 13751, 11000, 17252, 11410, 12528,
];

// defining variables for the API data
var drinkId;
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

// defining variable for the getDrink button
const getDrinkButton = $("#getDrink");

// event listener for the getDrink button, which generates a random drink ID and fetches the drink info from the API
getDrinkButton.on("click", function (e) {
  selectRandomDrink();
  getDrink(drinkId);
  // PJM Update the text displayed in the hint modal for how many ingredients in drink 
  hintEl.append("<p>There are " + ingredients.length + " ingredients you need to select.</p>");
  });

// generate a random drinkId from the above array
function selectRandomDrink() {
    const num = Math.floor(Math.random() * (drinkList.length + 1));
    drinkId = drinkList[num];
  }

  // fetch the drink info from the API using the generated drink ID
async function getDrink(drinkId) {
  var drinkUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;

  await fetch(drinkUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        drinkName = data.drinks[0].strDrink;
        instructions = data.drinks[0].strInstructions;
        glass = data.drinks[0].strGlass;
        thumbnail = data.drinks[0].strDrinkThumb;
        ingredients = [
          data.drinks[0].strIngredient1,
          data.drinks[0].strIngredient2,
          data.drinks[0].strIngredient3,
          data.drinks[0].strIngredient4,
          data.drinks[0].strIngredient5,
          data.drinks[0].strIngredient6,
          data.drinks[0].strIngredient7,
          data.drinks[0].strIngredient8,
          data.drinks[0].strIngredient9,
          data.drinks[0].strIngredient10,
          data.drinks[0].strIngredient11,
          data.drinks[0].strIngredient12,
          data.drinks[0].strIngredient13,
          data.drinks[0].strIngredient14,
          data.drinks[0].strIngredient15,
        ];
        ingredients = ingredients.splice(0, ingredients.indexOf(null));
        measurements = [
          data.drinks[0].strMeasure1,
          data.drinks[0].strMeasure2,
          data.drinks[0].strMeasure3,
          data.drinks[0].strMeasure4,
          data.drinks[0].strMeasure5,
          data.drinks[0].strMeasure6,
          data.drinks[0].strMeasure7,
          data.drinks[0].strMeasure8,
          data.drinks[0].strMeasure9,
          data.drinks[0].strMeasure10,
          data.drinks[0].strMeasure11,
          data.drinks[0].strMeasure12,
          data.drinks[0].strMeasure13,
          data.drinks[0].strMeasure14,
          data.drinks[0].strMeasure15,
        ];
        measurements = measurements.splice(0, measurements.indexOf(null));

      // assign the variables to the drinkObject
      drinkObject.drinkName = drinkName;
      drinkObject.instructions = instructions;
      drinkObject.glass = glass;
      drinkObject.thumbnail = thumbnail;
      drinkObject.ingredients = ingredients;
      drinkObject.measurements = measurements;
    });
    $("#drink-image").attr("src",drinkObject.thumbnail);
    generateIngredients(drinkObject);
}

function generateIngredients(drinkObject) {

  var correctIngredients = drinkObject.ingredients;
  var currentIngredients = [];

  for (i = 0; i < correctIngredients.length; i++) {
    correctIngredients[i] = correctIngredients[i].toLowerCase();
    currentIngredients.push(correctIngredients[i]);
    }

  for (i = currentIngredients.length; i < 15; i++) {
    var extraIngredientIndex = random(0, extraIngredients.length);
    var randomIngredient = extraIngredients[extraIngredientIndex];

    if (currentIngredients.indexOf(randomIngredient) === -1) {
      currentIngredients.push(randomIngredient);
    }
    else {
      i--;
    }
  }
}
