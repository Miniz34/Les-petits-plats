let recipe = []


function getRecipe() {
  return fetch("/assets/recipes.json")
    .then(response => response.json())
    .then(data => {
      return data
    })
}

const searchBar = document.getElementById("searchbar")
const submit = document.querySelector(".submitSearch")




const mainCard = ``



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




  })

  //test tri

  const div = document.querySelector(".recipe-list")
  const grid = document.querySelectorAll("section")
  console.log(div, grid)
  submit.addEventListener("click", e => {


    console.log(data.recipes)
    const allRecipes = data.recipes
    // div.removeChild(grid)
    const filter = allRecipes.filter(e => e.name.includes(searchBar.value))
    console.log(filter)
  })

  ///fin test ti


})

