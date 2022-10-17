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

/////////Nouveau code//////////
function renderError(card) {
  const recipeCards = document.querySelector(".recipe-list")
  const main = document.querySelector("main")
  const div = document.createElement("div")
  div.classList.add("recipe-none")
  div.innerHTML = `<p class="test-error">Veuillez plutot essayer <a href="" class="test-tarte">Tarte</a> ou <a href="" class="test-salad">Salade</a></p>`
  div.style.display = "none"
  main.insertBefore(div, recipeCards)
}
renderError()

function renderFilterIngredient() {
  const optionButton = document.querySelector(".sort-by-ingredient")
  const div = document.createElement("div")
  div.classList.add("filters-ingredient")
  div.style.display = "none"
  optionButton.appendChild(div)
}
renderFilterIngredient()

function renderFilterDevice() {
  const optionButton = document.querySelector(".sort-by-device")
  const div = document.createElement("div")
  div.classList.add("filters-device")
  div.style.display = "none"
  optionButton.appendChild(div)
}
renderFilterDevice()

function renderFilterUtensil() {
  const optionButton = document.querySelector(".sort-by-utensil")
  const div = document.createElement("div")
  div.classList.add("filters-utensil")
  div.style.display = "none"
  optionButton.appendChild(div)
}
renderFilterUtensil()

/////////fin//////////

function renderCard(card) {
  const div = document.createElement("article")
  div.classList.add("recipe-card")
  div.innerHTML = `  <div class="recipe-img"></div>
  <div class="recipe-content">
    <div class="content-title">
      <div class="title">
       ${card.name} gérard
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
  const noResult = document.querySelector(".recipe-none")
  collection.forEach(elem => elem.style.display = "none")

  filtered = allRecipes.filter(e => e.name.toLowerCase().includes(searchBar.value.toLowerCase()))
  if (filtered != 0) {
    filtered.map(card => card.element.style.display = "block")
    console.log(filtered)
  } else {
    noResult.style.display = "block"

  }

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

    const grid = document.querySelectorAll("section")
    submit.addEventListener("click", () => displayCards(data))
    searchbar.addEventListener("input", () => {
      if (searchBar.value.length >= 3)

        displayCards(data)

    }

    )


    /////////Nouveau code//////////
    //Redirections erreur
    const tarte = document.querySelector(".test-tarte")
    const error = document.querySelector(".test-error")
    const salade = document.querySelector(".test-salad")
    const noResult = document.querySelector(".recipe-none")

    tarte.addEventListener("click", e => {
      e.preventDefault()
      searchBar.value = "tarte"
      submit.click()
      noResult.style.display = "none"
    })

    salade.addEventListener("click", e => {
      e.preventDefault()
      searchBar.value = "salade"
      submit.click()
      noResult.style.display = "none"

    })

    getCardFilters(data)


    const filterValue = [...document.querySelectorAll(".filter-value")]

    console.log(filterValue)



    ///Tentative de filtrer par Tag n°1
    filterValue.forEach(elem => {
      elem.addEventListener("click", e => {
        e.preventDefault()
        recipeGrid.map(recipe => {
          const recipeList = recipe.ingredients
          console.log(elem.innerText)
          console.log(recipeList)

          const recipeFilter = recipeList.filter(filter => filter.ingredient === elem.innerText)
          console.log(recipeFilter)
        })
        // submit.click()
      })
    })



    ///Tentative de filtrer par Tag n°2 (n° 3 ligne 339)
    recipeGrid.map(recipe => {
      recipe.ingredients.map(ingredient => {
        filterValue.forEach(elem => {

          elem.addEventListener("click", e => {
            e.preventDefault()
            console.log(elem.innerText)

          })
        })
      })
    })



  })


/////////GET filtres 


const getCardFilters = (card) => {


  const fillerClose = document.querySelector(".fillerclose")


  //DOM ingrédients
  const ingredientButton = document.querySelector(".sort-by-ingredient")
  const ingredientFilterDisplay = document.querySelector(".filters-ingredient")

  //DOM appareils
  const deviceButton = document.querySelector(".sort-by-device")
  const deviceFilterDisplay = document.querySelector(".filters-device")

  //DOM usentiles
  const utensilButton = document.querySelector(".sort-by-utensil")
  const utensilFilterDisplay = document.querySelector(".filters-utensil")

  //DOM couleurs
  const blue = document.querySelector(".blue")
  const green = document.querySelector(".green")
  const red = document.querySelector(".red")

  //Value fitre




  //Cration array
  const allFilter = [{ ingredients: [], ustentils: [], appliance: [] }]
  const ingredientFilter = allFilter[0].ingredients
  const utensilFilter = allFilter[0].ustentils
  const deviceFilter = allFilter[0].appliance


  const recipeGrid = card.recipes
  recipeGrid.map(i => {
    const usentils = i.ustensils
    usentils.map(u => {
      utensilFilter.push(u)
    })
    const ingredients = i.ingredients
    ingredients.map(u => {
      ingredientFilter.push(u.ingredient)
    })
    const appliance = i.appliance
    deviceFilter.push(appliance)

  })

  console.log(allFilter)



  //add ingredients
  ingredientFilter.forEach(e => {
    const newIngr = document.createElement("p")
    newIngr.classList.add("filter-grid")
    newIngr.innerHTML = `<a href="javascript:void(0)" class="filter-value">${e}</a>`
    ingredientFilterDisplay.appendChild(newIngr)
  })

  ingredientButton.addEventListener("click", e => {
    ingredientFilterDisplay.style.display = "flex"
    ingredientButton.classList.add("open-blue")
    blue.innerHTML = "Rechercher un ingrédient"
    blue.style.opacity = 0.7
  })



  //add device
  deviceFilter.forEach(e => {
    const newDevice = document.createElement("p")
    newDevice.classList.add("filter-grid")
    newDevice.innerHTML = `<a href="javascript:void(0)" class="filter-value">${e}</a>`
    deviceFilterDisplay.appendChild(newDevice)
  })

  deviceButton.addEventListener("click", e => {
    deviceFilterDisplay.style.display = "flex"
    deviceButton.classList.add("open-green")
    green.innerHTML = "Rechercher un ingrédient"
    green.style.opacity = 0.7
  })

  //add utensil
  utensilFilter.forEach(e => {
    const newUtensil = document.createElement("p")
    newUtensil.classList.add("filter-grid")
    newUtensil.innerHTML = `<a href="javascript:void(0)" class="filter-value">${e}</a>`
    utensilFilterDisplay.appendChild(newUtensil)
  })

  utensilButton.addEventListener("click", e => {
    utensilFilterDisplay.style.display = "flex"
    utensilButton.classList.add("open-red")
    red.innerHTML = "Rechercher un ingrédient"
    red.style.opacity = 0.7
  })


  ///Bouton fermeture filtre filler en attendant de régler le blur


  fillerClose.onclick = event => {
    ingredientFilterDisplay.style.display = "none"
    ingredientButton.classList.remove("open-blue")

    deviceFilterDisplay.style.display = "none"
    deviceButton.classList.remove("open-green")

    utensilFilterDisplay.style.display = "none"
    utensilButton.classList.remove("open-red")

    blue.innerHTML = "Ingrédients"
    blue.style.opacity = 1

    green.innerHTML = "Appareils"
    green.style.opacity = 1

    red.innerHTML = "Usentiles"
    red.style.opacity = 1

    console.log("trigger")
  }




  ///Tentative de filtrer par Tag n°3


  // const filterValue = [...document.querySelectorAll(".filter-value")]

  // console.log(filterValue)

  // filterValue.forEach(elem => {
  //   elem.addEventListener("click", e => {
  //     e.preventDefault()
  //     searchBar.value = elem.innerText
  //     submit.click()
  //     console.log(elem.innerText)


  //     // submit.click()
  //   })
  // })



  console.log(allFilter)

  // [{ type: "appliance" }]
}

