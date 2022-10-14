let recipe = []


function getRecipe() {
  return fetch("/assets/recipes.json")
    .then(response => response.json())
}

const searchBar = document.getElementById("searchbar")
const submit = document.querySelector(".submitSearch")

function renderIngredients(card) {
  return card.ingredients.map(i =>
    `<p class="ingredient"><strong> ${i.ingredient}</strong> ${i.quantity ? ":" + i.quantity + (i.unit ? i.unit : "") : ""} </p>`
  ).join("")
}


function renderCard(card) {
  const div = document.createElement("article")
  div.classList.add("recipe-card")
  div.innerHTML = `  <div class="recipe-img"></div>
  <div class="recipe-content">
    <div class="content-title">
      <div class="title">
       ${card.name}
      </div>
      <div class="duration">
        <div class="clock">
          <span> <img src="assets/svg/clock.svg" class="clock-img" /></span>
        </div>
        <div class="timer">
          <p>${card.time} min</p>
        </div>
      </div>
    </div>
    <div class="content-recipe">
      <div class="content-ingredient">
        <div class="ingredients">
           ${renderIngredients(card)}
        </div>
      </div>
      <div class="content-description">
        <p class="description">${card.description}</p>
      </div>
    </div>
  </div>`
  card.element = div
  return div
}

let filtered = []
const displayCards = (data) => {

  console.log(data.recipes)
  const allRecipes = data.recipes
  // recipeCards.innerHTML = ""
  // const filtered = allRecipes.filter(e => e.name.toLowerCase().includes(searchBar.value.toLowerCase()))
  // filtered.map(card => recipeCards.appendChild(renderCard(card)))

  const collection = document.querySelectorAll(".recipe-card")
  collection.forEach(elem => elem.style.display = "none")
  filtered = allRecipes.filter(e => e.name.toLowerCase().includes(searchBar.value.toLowerCase()))
  filtered.map(card => card.element.style.display = "block")
}


getRecipe()
  .then(data => {

    const recipeGrid = data.recipes
    console.log(recipeGrid)
    console.log(data)
    let ingredientList = ""
    let ingredientQuantity = ""
    let ingredientUnit = ""
    const recipeCards = document.querySelector(".recipe-list")
    recipeGrid.map(card => recipeCards.appendChild(renderCard(card)))

    //test tri

    const grid = document.querySelectorAll("section")
    submit.addEventListener("click", () => displayCards(data))
    searchbar.addEventListener("input", () => { if (searchBar.value.length >= 3) displayCards(data) })

    ///fin test ti


  })










const getCardIngredients = (card) => {
  console.log(card.recipes)

  // [{ type: "ingredient", value: "" }]
}


// const tryArray = [{ type: "usentil", value: "test" }]
// console.log(tryArray)
// const allFilter = [{ ingredients: [""] }, { usentils: ["bonjour aurevoir"] }, { appliance: [""] }]
const allFilter = [{ ingredients: [], ustentils: [], appliance: [] }]
const testingr = allFilter[0].ingredients
const testust = allFilter[0].ustentils
const testappl = allFilter[0].appliance

const allUstentils = []
const allIngredients = []
const allAppliance = []
const getCardUstensils = (card) => {

  getRecipe().then(data => {
    const recipeGrid = data.recipes
    recipeGrid.map(i => {
      const usentils = i.ustensils
      usentils.map(u => {
        testust.push(u)
      })
      const ingredients = i.ingredients
      ingredients.map(u => {
        testingr.push(u.ingredient)
      })
      const appliance = i.appliance
      testappl.push(appliance)

    })

  })
  // return allUstentils, allIngredients, allAppliance
}

getCardUstensils()

// allFilter.push(allUstentils, allIngredients, allAppliance)

console.log(allFilter)
console.log(testingr)
console.log(testingr.includes("Lait de coco"))





const getCardAppliance = (card) => {

  card.ingredients.map(i => {
    console.log(i.ingredient)
  })
  [{ type: "appliance" }]
}


