import { API_DATABASE } from "./scripts/api_database.js"
import { CardRenderer, displayCards } from "./scripts/render/card.js"
import { TagRenderer } from "./scripts/render/tag.js"
import { generateCardFilters } from "./scripts/filters.js"
import { filterCards } from "./scripts/filters.js"
import { updateCardFilters } from "./scripts/filters.js"
import { generateError } from "./scripts/render/error.js"

const capitalizeFL = (t) => t.length > 0 ? t[0].toUpperCase() + t.slice(1).toLowerCase() : '';

window.onload = () => {
  /* Creating an error message that will be displayed if the user does not enter a search term or no results are return */
  generateError()
  const tarte = document.querySelector(".test-tarte")
  const salade = document.querySelector(".test-salad")
  const noResult = document.querySelector(".recipe-none")

  /* Clickable examples displayed by error msg*/
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



  /* Creating an array of objects for the filters */

  const filters = [
    {
      name: 'Ingrédients',
      key: 'ingredient',
      color: "blue",
      container: null,
      button: null,
      list: null
    },
    {
      name: "Appareils",
      key: 'device',
      color: "green",
      container: null,
      button: null,
      list: null
    },
    {
      name: "Ustensiles",
      key: 'utensil',
      color: "red",
      container: null,
      button: null,
      list: null
    }
  ]

  let filterOver = null

  /**
   * When a filter is clicked, hide all filters, then show the clicked filter.
   * @param filter - {
   * @returns the value of the last expression.
   */

  const switchFilter = (filter) => {

    filters.map(f => {


      f.container.classList.remove("sort-button-all-active")
      f.list.style.display = 'none'
      f.input.setAttribute("placeholder", capitalizeFL(f.key))

    })

    if (filter) {
      const f = filter;
      f.container.classList.add("sort-button-all-active");
      f.input.setAttribute("placeholder", `Rechercher un ${f.key}`)
      f.list.style.display = 'flex'
    }
  }




  /* Creating a button for each filter and appending it to the DOM. */
  filters.map(f => {
    f.container = document.querySelector(".sort-by-" + f.key)
    f.button = document.createElement("div")
    f.button.innerHTML = `<input placeholder="${capitalizeFL(f.key)}" type="filter" class="sort-button ${f.color} button${f.color}">
    <div><img src="assets/svg/up-arrow.svg" class="up-arrow ${f.key}" /></div>`
    f.button.classList.add("display-filters", "sort-button", f.color, "button" + f.color)

    f.list = document.createElement("div")
    f.list.classList.add(f.color, "filters-" + f.key, "filter-container")
    f.list.style.display = "none"

    f.input = f.button.querySelector("input")
    // f.input.onclick = () => { switchFilter(f) }
    f.input.onclick = () => { switchFilter(f) }
    f.container.appendChild(f.button)
    f.container.appendChild(f.list)

    const upArrow = f.button.querySelector(".up-arrow")
    upArrow.onclick = (event) => {
      if (f.container.classList.contains("sort-button-all-active")) {
        switchFilter(null)
      } else {
        switchFilter(f)
      }
    }
  })


  API_DATABASE.getRecipes()
    .then(data => {


      /*** It takes the value of the search bar, filters the data, updates the card filters, and displays
       * the cards.
       */
      const updateCards = () => {
        const filtered = filterCards(searchBar.value, data.recipes)
        updateCardFilters(filtered)
        displayCards(filtered)
        console.log(filtered)
      }

      const recipeGrid = data.recipes
      const recipeCards = document.querySelector(".recipe-list")


      /* Taking the value of the search bar, filtering the data, updating the card filters, and displaying
      the cards. */
      recipeGrid.map(card => recipeCards.appendChild(CardRenderer.card(card)))

      /* Filtering the data and generating the card filters. */
      const filtered = filterCards('', data.recipes)
      generateCardFilters(data.recipes)


      const getFilters = [...document.querySelectorAll(".filter-grid")]
      const activeTags = document.querySelector(".selecteds")
      const getInputFilters = [...document.querySelectorAll(".sort-button")]
      const colors = ['blue', 'green', 'red']
      colors.map(c => {
        const input = document.querySelector("input.sort-button." + c)
        const filters = [...document.querySelectorAll(`.filter-grid[color="${c}"]`)]
        /* Filtering the data and generating the card filters using the filters input */
        input.addEventListener("input", () => {
          filters.map(tags => {
            if (input.value) {
              if (!tags.id.includes(input.value)) {
                tags.style.display = "none"
              } else {
                tags.style.display = "block"
              }
            } else {
              tags.style.display = "block"
            }
          })
        })

        /* Adding an event listener to the clickable filters */
        filters.map(fg => {
          const f = document.getElementById(fg.id)
          f.onclick = () => {
            console.log(f)
            const tag = TagRenderer.tag(f.textContent, c)
            activeTags.appendChild(tag)
            updateCards()
            input.value = ""

            tag.querySelector(".close-filter").addEventListener("click", e => {
              activeTags.removeChild(tag)
              updateCards()
            })
          }
        })

      })

      /* Adding an event listener to the submit button */
      submit.addEventListener("click", () => {
        updateCards()
      })

      /* Adding an event listener to the general input */
      searchBar.addEventListener("input", () => {
        updateCards()
      })



    })
}


