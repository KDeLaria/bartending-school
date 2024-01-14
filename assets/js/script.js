//launch static background age verification modal upon page load - TP
document.addEventListener("DOMContentLoaded", function () {
  var ageVerify = new bootstrap.Modal(
    document.getElementById("staticBackdrop")
  );
  ageVerify.show();
});

// JP array of drink IDs
const drinkList = [
  11728, 17827, 17186, 17250, 17180, 11324, 11003, 15941, 17185, 17218, 11423,
  12101, 13621, 11002, 11006, 178317, 11008, 17251, 17247, 11720, 11001, 12127,
  12196, 11202, 17196, 13751, 11000, 17252, 11410, 12528,
];

// JP array of extra ingredients
var extraIngredients = [
  "gin",
  "vodka",
  "cognac",
  "white rum",
  "bourbon",
  "tequila",
  "scotch",
  "rye",
  "mezcal",
  "cachaca",
  "absinthe",
  "maraschino liqueur",
  "elderflower liqueuer",
  "grand marnier",
  "calvados",
  "apricot brandy",
  "coffee liqueur",
  "benedictine",
  "amaretto",
  "orange curacao",
  "blue curacao",
  "green chartreuse",
  "yellow chartreuse",
  "dry vermouth",
  "sweet vermouth",
  "triple sec",
  "cointreau",
  "campari",
  "creme de cacao",
  "cherry brandy",
  "lemon juice",
  "lime juice",
  "orange juice",
  "pineapple juice",
  "grapefruit juice",
  "apple juice",
  "cranberry juice",
  "angostura bitters",
  "orange bitters",
  "simple syrup",
  "egg white",
  "club soda",
  "grenadine",
  "cream",
  "champagne",
  "mint leaves",
  "honey syrup",
  "ginger ale",
  "ginger beer",
  "lillet blanc",
  "maple syrup",
  "aperol",
  "irish cream",
  "tonic water",
  "prosecco",
  "drambuie",
  "pisco",
  "limoncello",
  "honey",
  "cynar",
  "white creme de menthe",
  "midori",
  "sloe gin",
  "7-up",
  "rum",
  "brandy",
  "whiskey",
  "scotch",
  "bourbon",
  "creme du violet",
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
var changeGiveUp = false;

// JP function to generate random numbers
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// JP defining variable for the getDrink button
const getDrinkButton = $("#getDrink");

// JP event listener for the getDrink button, which generates a random drink ID and fetches the drink info from the API
getDrinkButton.on("click", async function (e) {
  $("#btnDiv").removeClass("d-none");
  selectRandomDrink();
  const drink = await getDrink(drinkId);
  generateIngredients(drink);
});

// JP generate a random drinkId from the above array
function selectRandomDrink() {
  const drinkIndex = random(0, drinkList.length);
  drinkId = drinkList[drinkIndex];
}

// JP fetch the drink info from the API using the generated drink ID
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

      for (i = 0; i < 15; i++) {
        let strIngredient = "strIngredient" + (i + 1);
        if (drinkObject[strIngredient]) {
          ingredients.push(drinkObject[strIngredient].toLowerCase());
        }
      }
      console.log(ingredients);
      for (i = 0; i < 15; i++) {
        let strMeasurement = "strMeasurement" + (i + 1).toString();
        if (drinkObject[strMeasurement]) {
          ingredients.push(drinkObject[strMeasurement]);
        }
      }

      // JP assign the variables to the drinkObject
      drinkObject.drinkName = drinkName;
      drinkObject.instructions = instructions;
      drinkObject.glass = glass;
      drinkObject.thumbnail = thumbnail;
      drinkObject.ingredients = ingredients;
      drinkObject.measurements = measurements;
    });
  $("#drink-name").text(drinkObject.drinkName);
  $("#drink-image").attr("src", drinkObject.thumbnail);
  return drinkObject;
}

// JP collect the current ingredients and add the necessary amount of extra ingredients to reach 15 total
function generateIngredients(drinkObject) {
  var correctIngredients = drinkObject.ingredients;
  var currentIngredients = [];

  for (i = 0; i < correctIngredients.length; i++) {
    correctIngredients[i] = correctIngredients[i];
    currentIngredients.push(correctIngredients[i]);
  }

  for (i = currentIngredients.length; i < 15; i++) {
    var extraIngredientIndex = random(0, extraIngredients.length);
    var randomIngredient = extraIngredients[extraIngredientIndex];

    if (currentIngredients.indexOf(randomIngredient) === -1) {
      currentIngredients.push(randomIngredient);
    } else {
      i--;
    }
  }
  renderIngredients(currentIngredients);
}

// JP render the current ingredients on the page
function renderIngredients(currentIngredients) {
  clearIngredients();
  currentIngredients = currentIngredients.sort();
  const currentIngredientsEl = $("#ingredients");
  // JP create container to hold ingredients
  const ingredientsListEl = $("<div>");
  ingredientsListEl.addClass(
    "container-fluid py-2 my-1 border border-dark text-left"
  );
  currentIngredientsEl.append(ingredientsListEl);

  // JP create row with columns
  const ingredientRowEl = $("<div>");
  ingredientRowEl.addClass("row row-cols-2 row-cols-md-3");
  ingredientsListEl.append(ingredientRowEl);

  // JP loop through the current ingredients, create a column that holds each checkbox and checkbox label
  for (i = 0; i < currentIngredients.length; i++) {
    const ingredientColumnEl = $("<div>");
    ingredientColumnEl.addClass("col");
    ingredientRowEl.append(ingredientColumnEl);

    let ingredientCheckbox = $("<input>");
    ingredientCheckbox.addClass("form-check-input me-1" + " ingredient" + i);
    ingredientCheckbox.attr("type", "checkbox");
    ingredientCheckbox.attr("value", currentIngredients[i]);
    ingredientCheckbox.attr("id", "flexCheckDefault");
    ingredientColumnEl.append(ingredientCheckbox);

    let ingredientCheckboxLabel = $("<label>");
    ingredientCheckboxLabel.addClass("form-check-label" + " ingredient" + i);
    ingredientCheckboxLabel.attr("for", "flexCheckDefault");
    ingredientCheckboxLabel.text(currentIngredients[i]);
    ingredientColumnEl.append(ingredientCheckboxLabel);
  }

  // PJM Update the text displayed in the hint modal for how many ingredients in drink
  var hintEl = $("#hintText");

  hintEl.append(
    "<p>There are " +
      drinkObject.ingredients.length +
      " ingredients you need to select.</p>"
  );
}

// JP function to clear ingredients before fetching
function clearIngredients() {
  const currentIngredientsEl = $("#ingredients");
  if (currentIngredientsEl) {
    currentIngredientsEl.html("");
  }

  const hintEl = $("#hintText");
  if (hintEl) {
    hintEl.html("");
  }
}

let mixItBtn = $("#mix-it");
mixItBtn.on("click", function () {
  if (drinkObject) {
    let mixSound = new Audio("./assets/audio/mixItSound.mp3");
    mixSound.play();
    // Make a sound when hitting the button
    // $("#dropping-ice").play();

    evaluateSelections();
  }
});

// JP evaluate selected ingredients against correct ingredients
function evaluateSelections() {
  const checkboxes = document.querySelectorAll(".form-check-input");
  let selectedIngredients = [];
  let correctIngredients = drinkObject.ingredients;

  // JP loop through selected items and add them to an array
  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedIngredients.push(checkboxes[i].value);
    }
  }
  selectedIngredients = selectedIngredients.sort();

  // JP if both arrays aren't the same length, return, otherwise compare the items in each array
  if (selectedIngredients.length !== correctIngredients.length || correctIngredients.length === 0) {
    console.log("try again!");
    return false;
  } else {
    for (var i = 0; i < selectedIngredients.length; i++) {
      if (selectedIngredients[i] !== correctIngredients[i]) {
        console.log("try again!");
        return false;
      }
    }
  }
  
  // Change the "give up" button to a "Make a card" button when the user answer correctly
  var giveUpEl = $("#giveUpBtn");
  giveUpEl.text("Make a drink card");
  changeGiveUp = true;
  console.log("correct!");
  return true;
}

//rb2277
//Function that sets the text content of the page to the drinks, and persits upon refresh.
function mistakeHistory() {
  for (let i = 1; i <= 5; i++) {
    let currentMistake = localStorage.getItem("Mistake Drink " + i);
    $("#mistake" + i).text(currentMistake);
  }
}

//jquery call to the give up button
// let giveUp = $("#giveUpBtn");

//event listener on clock of the give up button. It saves the current drink  name with saveDrink
$("#giveUpBtn").on("click", function () {
  if (!changeGiveUp) {
    let saveDrink = drinkObject.drinkName;
    //Will shift all previous drinks down 1 position, and add the latest drink to the top
    for (let i = 4; i >= 1; i--) {
      let recentMistake = localStorage.getItem("Mistake Drink " + i);
      if (recentMistake != null) {
        localStorage.setItem("Mistake Drink " + (i + 1), recentMistake);
      }
    }
    localStorage.setItem("Mistake Drink 1", saveDrink);

    //calls the makeHistory function at the end of the click listener so that it can update the content of the page.
    mistakeHistory();
  } else {
    makeCard();
  }
});

// Calling this function will go to the new page
function makeCard() {
  window.location = "./recipe.html";
}

//calls the mistake history function on line 110 so that the browser will load the local storage of the user
mistakeHistory();

//Logic for 21+ checker - TP
var today = dayjs()
var date21YearsAgo = today.subtract(21, 'year');
var formattedDate21YearsAgo = date21YearsAgo.format('YYYY-MM-DD')
var selectedDate

document.getElementById("datePicker").addEventListener("change", function() {
  var submitButton = document.getElementById("submitBirthday");
  if (this.value !== "") {
    submitButton.style.display = "block";
  } else {
    submitButton.style.display = "none";
  }
});

function getSelectedDate() {
  var selectedDate = document.getElementById("datePicker").value;
  if (selectedDate > formattedDate21YearsAgo) {
    alert("You are NOT allowed on this site. Give us a visit when you're 21!");
  } else {
    $('#staticBackdrop').modal('hide');
  }
}



document.getElementById("submitBirthday").addEventListener("click", function() {
  getSelectedDate();
});


document.getElementById("datePicker").addEventListener("change", function() {
  var submitButton = document.getElementById("submitBirthday");
  if (this.value !== "") {
    submitButton.style.display = "block";
  } else {
    submitButton.style.display = "none";
  }
});