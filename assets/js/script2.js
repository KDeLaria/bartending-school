//Do this as seperate page js or integrate into original

//listener for clicks on either Make a Recipe Card or Give Up or 

//pull in drink ID from URL
//re-run api  We need to do this because it's being directed here three different ways:
//recall
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
var cocktailIDArray = indexTwoURL.split('?');
var drinkId = cocktailIDArray[1]

console.log(drinkId)

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
      generateIngredients(drinkObject);
  }
  
  function generateIngredients(drinkObject) {
    console.log(drinkObject);
  }
    
getDrink(drinkId)

  function generateIngredients(drinkObject) {
    // Populate Recipe Card on recipe.html
console.log(drinkObject.ingredients[1])
    
    $('#drink-name').text(drinkObject.drinkName);
    $('#glass').text(drinkObject.glass);
    $('#instructions').text(drinkObject.instructions);
    $('#thumbnail').attr("src",drinkObject.thumbnail);  
    $('#step1').text(drinkObject.measurements[0] + drinkObject.ingredients[0]);
    $('#step2').text(drinkObject.measurements[1] + drinkObject.ingredients[1]);
    $('#step3').text(drinkObject.measurements[2] + drinkObject.ingredients[2]);
    $('#step4').text(drinkObject.measurements[3] + drinkObject.ingredients[3]);
    $('#step5').text(drinkObject.measurements[4] + drinkObject.ingredients[4]);
    $('#step6').text(drinkObject.measurements[5] + drinkObject.ingredients[5]);
    

}