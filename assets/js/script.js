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
  console.log(drinkObject);
});

// generate a random drinkId from the above array
function selectRandomDrink() {
    const num = Math.floor(Math.random() * (drinkList.length + 1));
    drinkId = drinkList[num];
  }

  // fetch the drink info from the API using the generated drink ID
function getDrink(drinkId) {
  var drinkUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;

  fetch(drinkUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.drinks.length; i++) {
        drinkName = data.drinks[i].strDrink;
        instructions = data.drinks[i].strInstructions;
        glass = data.drinks[i].strGlass;
        thumbnail = data.drinks[i].strDrinkThumb;
        ingredients = [
          data.drinks[i].strIngredient1,
          data.drinks[i].strIngredient2,
          data.drinks[i].strIngredient3,
          data.drinks[i].strIngredient4,
          data.drinks[i].strIngredient5,
          data.drinks[i].strIngredient6,
          data.drinks[i].strIngredient7,
          data.drinks[i].strIngredient8,
          data.drinks[i].strIngredient9,
          data.drinks[i].strIngredient10,
          data.drinks[i].strIngredient11,
          data.drinks[i].strIngredient12,
          data.drinks[i].strIngredient13,
          data.drinks[i].strIngredient14,
          data.drinks[i].strIngredient15,
        ];
        ingredients = ingredients.splice(0, ingredients.indexOf(null));
        measurements = [
          data.drinks[i].strMeasure1,
          data.drinks[i].strMeasure2,
          data.drinks[i].strMeasure3,
          data.drinks[i].strMeasure4,
          data.drinks[i].strMeasure5,
          data.drinks[i].strMeasure6,
          data.drinks[i].strMeasure7,
          data.drinks[i].strMeasure8,
          data.drinks[i].strMeasure9,
          data.drinks[i].strMeasure10,
          data.drinks[i].strMeasure11,
          data.drinks[i].strMeasure12,
          data.drinks[i].strMeasure13,
          data.drinks[i].strMeasure14,
          data.drinks[i].strMeasure15,
        ];
        measurements = measurements.splice(0, measurements.indexOf(null));
      }

      // assign the variables to the drinkObject
      drinkObject.drinkName = drinkName;
      drinkObject.instructions = instructions;
      drinkObject.glass = glass;
      drinkObject.thumbnail = thumbnail;
      drinkObject.ingredients = ingredients;
      drinkObject.measurements = measurements;
    });
}
