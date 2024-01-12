var hintEl = $("#hintText");

// list of drink IDs
const drinkList = [
  11728, 17827, 17186, 17250, 17180, 11324, 11003, 15941, 17185, 17218, 11423,
  12101, 13621, 11002, 11006, 178317, 11008, 17251, 17247, 11720, 11001, 12127,
  12196, 11202, 17196, 13751, 11000, 17252, 11410, 12528,
];

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
  "Simple syrup",
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

//Function to generate random numbers
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// defining variable for the getDrink button
const getDrinkButton = $("#getDrink");

// event listener for the getDrink button, which generates a random drink ID and fetches the drink info from the API
getDrinkButton.on("click", function (e) {
  $("#btnDiv").removeClass("d-none")
  selectRandomDrink();
  getDrink(drinkId);
  // PJM Update the text displayed in the hint modal for how many ingredients in drink
  hintEl.append(
    "<p>There are " +
      ingredients.length +
      " ingredients you need to select.</p>"
  );
});

// generate a random drinkId from the above array
function selectRandomDrink() {
  const drinkIndex = random(0, drinkList.length);
  drinkId = drinkList[drinkIndex];
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
  $("#drink-name").text(drinkObject.drinkName);//KD
  $("#drink-image").attr("src", drinkObject.thumbnail);
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
    } else {
      i--;
    }
  }
}

//rb2277
//Function that sets the text content of the page to the drinks, and persits upon refresh.
function mistakeHistory() {
  for(let i = 1; i <= 5; i++) {
    let currentMistake = localStorage.getItem("Mistake Drink " + i);
      $("#mistake" + i).text(currentMistake);
  }
  }

//jquery call to the give up button
let giveUp = $("#giveUpBtn");

//event listener on clock of the give up button. It saves the current drink  name with saveDrink
giveUp.on('click', function() {
  let saveDrink = drinkObject.drinkName;

//Will shift all previous drinks down 1 position, and add the latest drink to the top
  for(let i = 4; i >= 1; i--) {
    let recentMistake = localStorage.getItem("Mistake Drink " + i);
    if(recentMistake != null) {
    localStorage.setItem("Mistake Drink " + (i + 1), recentMistake);
}
}


  localStorage.setItem("Mistake Drink 1", saveDrink);

  //calls the makeHistory function at the end of the click listener so that it can update the content of the page.
  mistakeHistory();
})

//calls the mistake history function on line 110 so that the browser will load the local storage of the user
mistakeHistory()
// KD
$("#mix-it").on("click", mixDrink); 
function mixDrink () {
  $("#dropping-ice").play();
}