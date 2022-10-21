let recipe = []

function getRecipe() {
  return fetch("/assets/recipes.json")
    .then(response => response.json())
}

// Card Renderer (object that contains a method for each element to display)
const CardRenderer = {
  preview: (card) => `<div class="recipe-img"></div>`,

  name: (card) => `<div class="content-title"><div class="title">${card.name}</div>`,

  ingredient: (i) => `<p class="ingredient"> <strong> ${i.ingredient}</strong> ${i.quantity ? ":" + i.quantity + (i.unit ? i.unit : "") : ""} </p>`,

  ingredients: (card) => `<div class="content-ingredient"><div class="ingredients">${card.ingredients.map(i => CardRenderer.ingredient(i)).join("")}</div></div>`,

  duration: (card) => `<div class="duration">
			<div class="clock"><span><img src="assets/svg/clock.svg" class="clock-img" /></span></div>
			<div class="timer"><p>${card.time} min</p></div>
		</div>`,

  description: (card) => `<div class="content-description"><p class="description">${card.description}</p></div>`,

  card: (card) => {
    card.element = document.createElement("article")
    card.element.classList.add("recipe-card")
    card.element.card = card;
    card.element.innerHTML = `
		${CardRenderer.preview(card)}
		<div class="recipe-header">
			${CardRenderer.name(card)}
			${CardRenderer.duration(card)}
		</div>

		<div class="recipe-main">
			${CardRenderer.ingredients(card)}
			${CardRenderer.description(card)}
		</div>`
    return card.element
  }
}


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


const filterCards = (value, data, tags) => {


  const searchBar = document.getElementById("searchbar")
  const submit = document.querySelector(".submitSearch")



  const allRecipes = data.recipes
  // recipeCards.innerHTML = ""
  // const filtered = allRecipes.filter(e => e.name.toLowerCase().includes(searchBar.value.toLowerCase()))
  // filtered.map(card => recipeCards.appendChild(renderCard(card)))

  const collection = document.querySelectorAll(".recipe-card")
  const noResult = document.querySelector(".recipe-none")
  collection.forEach(elem => elem.style.display = "none")




  // const filtered = allRecipes.filter(e => e.name.toLowerCase().includes(value.toLowerCase())) 
  // const filtered = allRecipes.filter(e => e.name.toLowerCase().includes(value.toLowerCase()) || e.appliance.toLowerCase().includes(value.toLowerCase()))


  //.find() ou .some cause un conflit avec e.name
  const filtered = allRecipes.filter(
    (e) =>
      e.name.toLowerCase().includes(value.toLowerCase()) ||
      e.appliance.toLowerCase().includes(value.toLowerCase())
      ||
      e.ingredients.find((el) => el.ingredient.toLowerCase().includes(value.toLowerCase())) ||
      e.ustensils.find((el) => el.toLowerCase().includes(value.toLowerCase()))
  )


  if (filtered.length > 0) {
    filtered.map(card => card.element.style.display = "block")
  } else {
    noResult.style.display = "block"
  }

  tags = [{}]
  filtered.map(i => {
    i.ustensils.map(u => {
      if (tags.indexOf(u) < 0) tags.push({ type: "utensil", name: `${u}` })
    })
    i.ingredients.map(u => {
      if (tags.indexOf(u.ingredient) < 0) tags.push({ type: "ingredient", name: `${u.ingredient}` })
    })
    if (tags.indexOf(i.appliance) < 0) tags.push({ type: "appliance", name: `${i.appliance}` })
  })

  console.log(tags)

  // console.log(tags)

  if (tags.length < 1) return filtered


  /* Filtering the cards based on the tags. */
  const filteredTags = filtered.filter(card => {
    // console.log(card)
    if (tags.filter(t => {
      switch (t.type) {
        case "ingredient":
          return card.ingredients.filter(i => i.ingredient.toLowerCase() === t.name.toLowerCase())
          break;

        case "utensil":
          return card.ustensils.find(i => i.toLowerCase() === t.name.toLowerCase())
          break;

        case "appliance":
          return card.appliance.toLowerCase() === t.name.toLowerCase()
          break;
      }
    }).length > 0) return card
  })

  // console.log(filteredTags)
  return filteredTags
}




/////////GET filtres 


const getCardFilters = (cards) => {


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

  cards.map(i => {
    i.ustensils.map(u => {
      if (utensilFilter.indexOf(u.toLowerCase()) < 0) utensilFilter.push(u.toLowerCase())
    })
    i.ingredients.map(u => {
      if (ingredientFilter.indexOf(u.ingredient.toLowerCase()) < 0) ingredientFilter.push(u.ingredient.toLowerCase())
    })
    if (deviceFilter.indexOf(i.appliance.toLowerCase()) < 0) deviceFilter.push(i.appliance.toLowerCase())
  })


  //filtrer accent
  ingredientFilter.sort()
  utensilFilter.sort()
  deviceFilter.sort()





  //add ingredients
  ingredientFilter.forEach(e => {
    const newIngr = document.createElement("p")
    newIngr.classList.add("filter-grid")
    newIngr.innerHTML = `<a href="javascript:void(0)" class="filter-value">${e}</a>`
    ingredientFilterDisplay.appendChild(newIngr)
  })

  //add device
  deviceFilter.forEach(e => {
    const newDevice = document.createElement("p")
    newDevice.classList.add("filter-grid")
    newDevice.innerHTML = `<a href="javascript:void(0)" class="filter-value">${e}</a>`
    deviceFilterDisplay.appendChild(newDevice)
  })

  //add utensil
  utensilFilter.forEach(e => {
    const newUtensil = document.createElement("p")
    newUtensil.classList.add("filter-grid")
    newUtensil.innerHTML = `<a href="javascript:void(0)" class="filter-value">${e}</a>`
    utensilFilterDisplay.appendChild(newUtensil)
  })



}







window.onload = () => {

  const searchBar = document.getElementById("searchbar")
  const submit = document.querySelector(".submitSearch")

  const filters = [
    {
      name: 'Ingrédients',
      key: 'ingredient',
      color: "blue",
      button: null,
      list: null
    },
    {
      name: "Appareils",
      key: 'device',
      color: "green",
      button: null,
      list: null
    },
    {
      name: "Ustensiles",
      key: 'utensil',
      color: "red",
      button: null,
      list: null
    }
  ]

  let filterOver = null
  const switchFilter = (filter) => {
    filters.map(f => f.list.style.display = 'none')

    if (filterOver === filter) {
      filterOver = null
      return
    }

    filter.list.style.display = 'flex'
    filterOver = filter
  }

  filters.map(f => {
    const container = document.querySelector(".sort-by-" + f.key)
    f.button = document.createElement("button")
    f.button.textContent = f.name
    f.button.classList.add("sort-button", f.color)
    f.list = document.createElement("div")
    f.list.classList.add(f.color, "filters-" + f.key, "filter-container")
    f.list.style.display = "none"
    container.appendChild(f.button)
    container.appendChild(f.list)
    f.button.onclick = () => { switchFilter(f) }
  })

  getRecipe()
    .then(data => {

      const recipeGrid = data.recipes
      const recipeCards = document.querySelector(".recipe-list")
      recipeGrid.map(card => recipeCards.appendChild(CardRenderer.card(card)))

      const grid = document.querySelectorAll("section")
      submit.addEventListener("click", () => {
        let filtered = filterCards(searchBar.value, data)
        getCardFilters(filtered)
      })


      searchbar.addEventListener("input", () => {
        if (searchBar.value.length >= 3) {
          let filtered = filterCards(searchBar.value, data)
          getCardFilters(filtered)
        }
        renderError()

      })

      let filtered = filterCards(searchBar.value, data)
      getCardFilters(filtered)

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



      const getFilters = [...document.querySelectorAll(".filter-value")]
      const choiceTest = document.querySelector(".selected")

      getFilters.forEach(f => {
        f.addEventListener("click", e => {
          console.log(f.innerText)
          let filtered = filterCards(f.innerText, data)

          getCardFilters(filtered)
          console.log(filtered)
        })
      })




      getFilters.forEach(f => {
        f.addEventListener("click", e => {
          // choiceTest.innerHTML = f.innerText
          const div = document.createElement("div")
          div.classList.add("selected-list", "blue")
          // div.setAttribute("style", "background-color:blue")
          div.innerHTML = f.innerText + `<img src="assets/svg/close.svg" class="close-img close-filter" />`
          choiceTest.appendChild(div)

          const closeFilter = [...document.querySelectorAll(".close-filter")]

          closeFilter.forEach(e => {
            e.addEventListener("click", e => {
              choiceTest.removeChild(div)

            })
          })


        })
      })


    })

}


/* <button class="close-filter"></button> */ 