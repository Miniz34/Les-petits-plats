import { API_DATABASE } from "./scripts/api_database.js"
import { CardRenderer } from "./scripts/render/card.js"
import { TagRenderer } from "./scripts/render/tag.js"



function generateError(card) {
  const recipeCards = document.querySelector(".recipe-list")
  const main = document.querySelector("main")
  const div = document.createElement("div")
  div.classList.add("recipe-none")
  div.innerHTML = `<p class="test-error">Veuillez plutot essayer <a href="" class="test-tarte">Tarte</a> ou <a href="" class="test-salad">Salade</a></p>`
  div.style.display = "none"
  main.insertBefore(div, recipeCards)
}

const generateCardFilters = (cards) => {

  const ingredientFilter = []
  const utensilFilter = []
  const deviceFilter = []

  // TODO : document
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

  //DOM ingrédients
  const ingredientFilterDisplay = document.querySelector(".filters-ingredient")

  //DOM appareils
  const deviceFilterDisplay = document.querySelector(".filters-device")

  //DOM usentiles
  const utensilFilterDisplay = document.querySelector(".filters-utensil")

  //add ingredients
  ingredientFilter.map(e => {
    const newIngr = document.createElement("p")
    newIngr.classList.add("filter-grid")
    newIngr.innerHTML = `<a href="javascript:void(0)" class="filter-value">${e}</a>`
    newIngr.setAttribute("color", "blue")
    newIngr.id = "i-" + e
    ingredientFilterDisplay.appendChild(newIngr)
  })

  //add device
  deviceFilter.map(e => {
    const newDevice = document.createElement("p")
    newDevice.classList.add("filter-grid")
    newDevice.innerHTML = `<a href="javascript:void(0)" class="filter-value">${e}</a>`
    newDevice.setAttribute("color", "green")
    newDevice.id = "a-" + e
    deviceFilterDisplay.appendChild(newDevice)
  })

  //add utensil
  utensilFilter.map(e => {
    const newUtensil = document.createElement("p")
    newUtensil.classList.add("filter-grid")
    newUtensil.innerHTML = `<a href="javascript:void(0)" class="filter-value">${e}</a>`
    newUtensil.setAttribute("color", "red")
    newUtensil.id = "u-" + e
    utensilFilterDisplay.appendChild(newUtensil)
  })
}





const filterCards = (value, list) => {

  const tagsElements = [...document.querySelector(".selecteds").querySelectorAll(".selected-list")]
  const tags = tagsElements.map(t => { return { name: t.textContent, color: t.getAttribute('color') } })

  //.find() ou .some cause un conflit avec e.name

  const filtered =
    value.length >= 3 ?
      list.filter(
        (e) =>
          e.name.toLowerCase().includes(value.toLowerCase()) ||
          e.appliance.toLowerCase().includes(value.toLowerCase())
          ||
          e.ingredients.some((el) => el.ingredient.toLowerCase().includes(value.toLowerCase())) ||
          e.ustensils.some((el) => el.toLowerCase().includes(value.toLowerCase()))
      ) : [...list]

  if (tags.length < 1) return filtered

  /* Filtering the cards based on the tags. */
  return filtered.filter(card => {
    if (tags.filter(t => {
      switch (t.color) {
        case "blue": return card.ingredients.filter(i => i.ingredient.toLowerCase() === t.name.toLowerCase()).length > 0 // -> retourne un tableau contenant les élements qui répondent à la condition
        case "red": return card.ustensils.find(i => i.toLowerCase() === t.name.toLowerCase()) // -> presque pareil mais retourne seulement le premier élément remplissant la condition
        case "green": return card.appliance.toLowerCase() === t.name.toLowerCase()
      }
      return false
    }).length === tags.length) return card
  })

  // console.log(filteredTags)
}



const updateCardFilters = (cards, tags) => {
  // console.log(cards)
  const arr_i = []
  const arr_u = []
  const arr_a = []

  cards.map(i => {
    i.ingredients.map(u => {
      if (arr_i.indexOf(u.ingredient.toLowerCase()) < 0) arr_i.push(u.ingredient.toLowerCase())
    })
    i.ustensils.map(u => {
      if (arr_u.indexOf(u.toLowerCase()) < 0) arr_u.push(u.toLowerCase())
    })
    if (arr_a.indexOf(i.appliance.toLowerCase()) < 0) arr_a.push(i.appliance.toLowerCase())
  })

  document.querySelectorAll(".filter-grid").forEach(elem => elem.style.display = "none")
  arr_i.forEach(e => document.getElementById("i-" + e).style.display = "block")
  arr_u.forEach(e => document.getElementById("u-" + e).style.display = "block")
  arr_a.forEach(e => document.getElementById("a-" + e).style.display = "block")

  const tagsElements = [...document.querySelector(".selecteds").querySelectorAll(".selected-list")]
  tagsElements.map(t => {
    switch (t.getAttribute('color')) {
      case 'red': document.getElementById("u-" + t.textContent).style.display = "none"; break
      case 'green': document.getElementById("a-" + t.textContent).style.display = "none"; break
      case 'blue': document.getElementById("i-" + t.textContent).style.display = "none"; break
    }
  })

}


const displayCards = (recipeList) => {
  const noResult = document.querySelector(".recipe-none")
  const collection = document.querySelectorAll(".recipe-card")
  collection.forEach(elem => elem.style.display = "none")
  if (recipeList.length > 0) {
    recipeList.forEach(card => card.element.style.display = "block")
    noResult.style.display = "none"
  } else {
    noResult.style.display = "block"
  }
}




window.onload = () => {

  generateError()

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

  const searchBar = document.getElementById("searchbar")
  const submit = document.querySelector(".submitSearch")

  const filters = [
    {
      name: 'Ingrédients',
      key: 'ingredient',
      color: "blue",
      button: null,
      list: null,
      arrow: null
    },
    {
      name: "Appareils",
      key: 'device',
      color: "green",
      button: null,
      list: null,
      arrow: null
    },
    {
      name: "Ustensiles",
      key: 'utensil',
      color: "red",
      button: null,
      list: null,
      arrow: null
    }
  ]

  let filterOver = null

  const switchFilter = (filter) => {


    filters.map(f => {
      f.list.style.display = 'none'
      console.log(filter)
      const container = document.querySelector(".button" + filter.color)
      container.parentElement.classList.toggle("open")

      //à retourner lors de la fermeture
      container.lastElementChild.style.transform = "rotate(180deg)"

      // container.innerHTML = "Rechercher un" + " " + filter.key
    }
    )
    /* Toggling the class `hello` on the element with the class `sort-button-ingredient`. */
    // const container = document.querySelector(".sort-button-ingredient")
    // container.classList.toggle("hello")



    if (filterOver === filter) {
      filterOver = null
      return
    }

    filter.list.style.display = 'flex'
    filterOver = filter
  }


  filters.map(f => {
    const container = document.querySelector(".sort-by-" + f.key)
    f.button = document.createElement("input")
    f.button.setAttribute("placeholder", f.key)
    f.button.setAttribute("type", "filter")

    f.button = document.createElement("div")
    f.button.innerHTML = `<input placeholder="${f.key}" type="filter" class="sort-button ${f.color} button${f.color}">
    <div><img src="assets/svg/up-arrow.svg" class="up-arrow" /></div>`

    // f.button.setAttribute("placeholder", f.key)
    // f.button.setAttribute("type", "filter")


    // f.button.style = "color: white"
    // f.button.textContent = newArrow
    // allFilter.appendChild(newArrow)
    // console.log(f)
    // allFilter.map(e => {
    //   // console.log(e)
    //   e.appendChild(newArrow)
    // })
    f.button.classList.add("display-filters", "sort-button", f.color, "button" + f.color)
    f.list = document.createElement("div")
    f.list.classList.add(f.color, "filters-" + f.key, "filter-container")
    f.list.style.display = "none"
    container.appendChild(f.button)
    container.appendChild(f.list)
    f.button.onclick = () => { switchFilter(f) }
  })

  API_DATABASE.getRecipes()
    .then(data => {

      //Redirections erreur
      const recipeGrid = data.recipes
      const recipeCards = document.querySelector(".recipe-list")
      recipeGrid.map(card => recipeCards.appendChild(CardRenderer.card(card)))

      const filtered = filterCards('', data.recipes)
      generateCardFilters(data.recipes)


      const getFilters = [...document.querySelectorAll(".filter-grid")]
      const activeTags = document.querySelector(".selecteds")
      const getInputFilters = [...document.querySelectorAll(".sort-button")]


      // NOUVEAU CODE ///
      // NOUVEAU CODE ///
      // NOUVEAU CODE ///

      getInputFilters.map(e => {
        e.addEventListener("input", () => {
          const filtered = filterCards(searchBar.value, data.recipes)
          // // const searchFilter = getFilters.includes(e.value)
          // displayCards(filtered)
          // updateCardFilters(searchFilter)
          // console.log(filtered)
          getFilters.map(tags => {
            if (e.value) {
              if (tags.id.includes(e.value)) {
              } else {
                tags.style.display = "none"
              }
            } else {
              updateCardFilters(filtered)
              // displayCards(filtered)

            }
          })
        })
      })


      // FIN NOUVEAU CODE ///
      // FIN NOUVEAU CODE ///
      // FIN NOUVEAU CODE ///

      getFilters.map(f => {
        const color = f.parentNode.classList[0]
        f.querySelector(".filter-value").addEventListener("click", () => {



          console.log(f.parentNode)
          const tag = TagRenderer.tag(f.innerText, color)
          activeTags.appendChild(tag)




          // let reFiltered = filterCards(tag.innerText, filtered)
          // console.log(reFiltered)


          let filtered = filterCards(searchBar.value, data.recipes)
          console.log(filtered)

          updateCardFilters(filtered, activeTags.innerText)
          displayCards(filtered)


          ///Fermer automatiquer les filtres (je sais plus pourquoi je faisais ça) 
          // const container = [...document.querySelectorAll(".sort-button-all")]
          // console.log(container)
          // container.forEach(e => {
          //   e.classList.remove("open")
          //   console.log(e)
          //   switchFilter(e)

          // })



          tag.querySelector(".close-filter").addEventListener("click", e => {
            activeTags.removeChild(tag)
            const filtered = filterCards(searchBar.value, data.recipes)
            updateCardFilters(filtered, activeTags.innerText)
            displayCards(filtered)

          })
          // searchBar.value = f.innerText

        })

      })

      submit.addEventListener("click", () => {
        const filtered = filterCards(searchBar.value, data.recipes)
        updateCardFilters(filtered)
        displayCards(filtered)
        console.log(filtered)
      })

      searchbar.addEventListener("input", () => {
        const filtered = filterCards(searchBar.value, data.recipes)
        updateCardFilters(filtered)
        displayCards(filtered)
        console.log(filtered)
      })


    })

}
