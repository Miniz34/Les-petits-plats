
/**
 * It takes an array of objects, and creates a list of filters based on the properties of those objects
 * @param cards - an array of objects
 */
export const generateCardFilters = (cards) => {

  const ingredientFilter = []
  const utensilFilter = []
  const deviceFilter = []

  /* Iterating over the cards array and pushing the values of the properties of the objects in the array
  to the arrays ingredientFilter, utensilFilter and deviceFilter. */
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

  /* Creating a new paragraph element for "Ingredient" and appending it to the DOM. */
  ingredientFilter.map(e => {
    const newIngr = document.createElement("p")
    newIngr.classList.add("filter-grid")
    newIngr.innerHTML = `<a href="javascript:void(0)" class="filter-value">${e}</a>`
    newIngr.setAttribute("color", "blue")
    newIngr.id = "i-" + e
    ingredientFilterDisplay.appendChild(newIngr)
  })

  /* Creating a new paragraph element for "Device" and appending it to the DOM. */
  deviceFilter.map(e => {
    const newDevice = document.createElement("p")
    newDevice.classList.add("filter-grid")
    newDevice.innerHTML = `<a href="javascript:void(0)" class="filter-value">${e}</a>`
    newDevice.setAttribute("color", "green")
    newDevice.id = "a-" + e
    deviceFilterDisplay.appendChild(newDevice)
  })

  /* Creating a new paragraph element for "Utensil" and appending it to the DOM. */
  utensilFilter.map(e => {
    const newUtensil = document.createElement("p")
    newUtensil.classList.add("filter-grid")
    newUtensil.innerHTML = `<a href="javascript:void(0)" class="filter-value">${e}</a>`
    newUtensil.setAttribute("color", "red")
    newUtensil.id = "u-" + e
    utensilFilterDisplay.appendChild(newUtensil)
  })
}


/**
 * It filters the list of cards based on the value of the search input and the tags.
 * @param value - the value of the search input
 * @param list - the list of cards
 * @returns An array of objects.
 */

export const filterCards = (value, list) => {

  const tagsElements = [...document.querySelector(".selecteds").querySelectorAll(".selected-list")]
  const tags = tagsElements.map(t => { return { name: t.textContent, color: t.getAttribute('color') } })

  /* Filtering the list of cards based on the value of the search input. */
  //*TODO : input général à part (retourne cuillère à soupe quand on tape soupe)
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
}


/**
 * It takes an array of objects (cards) and updates the display of the
 * elements in the DOM.
 * @param cards - an array of objects, each object is a card
 */
export const updateCardFilters = (cards, tags) => {
  // console.log(cards)
  const arr_i = []
  const arr_u = []
  const arr_a = []

  /* Iterating over the cards array and pushing the values of the properties of the objects in the array
  to the arrays ingredientFilter, utensilFilter and deviceFilter. */
  cards.map(i => {
    i.ingredients.map(u => {
      if (arr_i.indexOf(u.ingredient.toLowerCase()) < 0) arr_i.push(u.ingredient.toLowerCase())
    })
    i.ustensils.map(u => {
      if (arr_u.indexOf(u.toLowerCase()) < 0) arr_u.push(u.toLowerCase())
    })
    if (arr_a.indexOf(i.appliance.toLowerCase()) < 0) arr_a.push(i.appliance.toLowerCase())
  })

  /* Hiding all the elements with the class "filter-grid" and then showing only the elements that are in
  the arrays arr_i, arr_u and arr_a. => meaning showing the element that are still available in the cards result */
  document.querySelectorAll(".filter-grid").forEach(elem => elem.style.display = "none")
  arr_i.forEach(e => document.getElementById("i-" + e).style.display = "block")
  arr_u.forEach(e => document.getElementById("u-" + e).style.display = "block")
  arr_a.forEach(e => document.getElementById("a-" + e).style.display = "block")

  /* Hiding the elements that are already selected. */
  const tagsElements = [...document.querySelector(".selecteds").querySelectorAll(".selected-list")]
  tagsElements.map(t => {
    switch (t.getAttribute('color')) {
      case 'red': document.getElementById("u-" + t.textContent).style.display = "none"; break
      case 'green': document.getElementById("a-" + t.textContent).style.display = "none"; break
      case 'blue': document.getElementById("i-" + t.textContent).style.display = "none"; break
    }
  })
  console.log("e")
}
