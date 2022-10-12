let recipe = []


function getRecipe() {
  return fetch("/assets/recipes.json")
    .then(response => response.json())
    .then(data => {
      return data
    })
}



getRecipe().then(data => {
  const recipeGrid = data.recipes
let ingredientList = ""
let ingredientQuantity = ""
let ingredientUnit = ""
  const recipeCard = document.querySelector(".recipe-list")
    recipeGrid.map(elem => {

      const ingredient = elem.ingredients
      ingredient.forEach(element => {
        ingredientList = element.ingredient
        ingredientQuantity = element.quantity
        ingredientUnit = element.unit
        
      });

      const newDiv = document.createElement("section")
    newDiv.innerHTML = `      <section class="recipe-card">
<div class="recipe-img">

</div>
<div class="recipe-content">
  <div class="content-title">
    <div class="title">
    ${elem.name}
    </div>
    <div class="duration">
      <div class="clock">
        <span> <img src="assets/svg/clock.svg" class="clock-img" /></span>
      </div>
      <div class="timer">
        <p>${elem.time} min</p>
      </div>
    </div>
  </div>
  <div class="content-recipe">
    <div class="content-ingredient">
      <p class="ingredient">
        <strong>${ingredientList}:</strong> ${ingredientQuantity} ${ingredientUnit}
      </p>
    </div>
    <div class="content-description">
      <p class="description">${elem.description}</p>
    </div>
  </div>
</div>
</section>`

recipeCard.appendChild(newDiv)





} )

const test = document.querySelectorAll(".content-ingredient")
let newTest = [...test]
console.log(newTest)



})




//Dom targeting

// const recipeList = document.querySelector(".recipe-list")
// console.log(recipeList)

// function createCard(p) {
//   recipeList.innerHTML = `      <section class="recipe-card">
// <div class="recipe-img">

// </div>
// <div class="recipe-content">
//   <div class="content-title">
//     <div class="title">
      
//     </div>
//     <div class="duration">
//       <div class="clock">
//         <span> <img src="assets/svg/clock.svg" class="clock-img" /></span>
//       </div>
//       <div class="timer">
//         <p>10 min</p>
//       </div>
//     </div>

//   </div>
//   <div class="content-recipe">
//     <div class="content-ingredient">
//       <p class="ingredient">
//         <strong>couscous:</strong> 1 kilo
//       </p>

//     </div>
//     <div class="content-description">
//       <p class="description">eazezaezae</p>
//     </div>
//   </div>

// </div>

// </section>`

// }