console.log(tags)
getFilters.forEach(f => {
  console.log(f)
  f.addEventListener("click", e => {

    const filteredTags = recipeGrid.filter(card => {
      // console.log(card.ingredients[0])
      // const test = tags.filter(res => res.type == f.innerText)
      // console.log(test)
      tags.filter(t => {
        if (t.type === "ingredient") {
          return card.ingredients.filter(i => i.ingredient.toLowerCase() === t.name.toLowerCase())

        }
      })


    })
    console.log(filteredTags)
  })
})











const manageFilters = (data) => {
  const filters = data.recipes
  console.log(filters)

  tags = [{}]
  filters.map(i => {
    i.ustensils.map(u => {
      if (tags.indexOf(u) < 0) tags.push({ type: "utensil", name: `${u}` })
    })
    i.ingredients.map(u => {
      if (tags.indexOf(u.ingredient) < 0) tags.push({ type: "ingredient", name: `${u.ingredient}` })
    })
    if (tags.indexOf(i.appliance) < 0) tags.push({ type: "appliance", name: `${i.appliance}` })
  })

  console.log(tags)

  filteredTest = filters.filter(card => {
    console.log(card)

  })

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


const filteredTags = recipeGrid.filter(e => e.name.toLowerCase().includes(value.toLowerCase()))
if (filteredTags.length > 0) {
  filteredTags.map(card => card.element.style.display = "block")
} else {
  noResult.style.display = "block"
}


getFilters.forEach(f => {
  f.addEventListener("click", e => {
    const filteredTagsAll = filteredTags.filter(card => {
      // console.log(card)
      if (tags.filter(t => {
        switch (t.type) {
          case "ingredient":
            const testUn = card.ingredients.filter(i => i.ingredient.toLowerCase() === f.innerText.toLowerCase())
            if (testUn) {
              return card
            }
            break;

          case "utensil":
            const testDeux = card.ustensils.find(i => i.toLowerCase() === f.innerText.toLowerCase())
            if (testDeux) {
              return card
            }
            break;

          case "appliance":
            const testTrois = card.appliance.toLowerCase() === f.innerText.toLowerCase()
            if (testTrois) {
              return card
            }

            break;
        }
      }).length > 0) return card
    })


    console.log(filteredTagsAll)

    let testFilter = filterCards(searchBar.value, data)
    console.log(testFilter)
    return getCardFilters(testFilter)

  })
})





// console.log(tags.ingredient)

// let tagsIngredient = []
// let tagsAppliance = []
// let tagsUtensil = []

// tags.filter(o => {
//   tagsIngredient = o.ingredients
//   tagsAppliance = o.appliance
//   tagsUtensil = o.ustentils
// })

// console.log(tagsIngredient, deviceFilter, tagsUtensil)


// filter tags


filtered.filter(card => {
  // console.log(card)
  tags.filter(i => {
    switch (i.type) {
      case "ingredient":
        // console.log(card)
        // console.log(i.type)

        break;
      case "appliance":
        // console.log("tags")
        break;
      case "utensil":
        // console.log("tags")
        break;
      default:
    }
  })
})





Utilisation des Tags avec un switch

  // tags.map(i => {
  //   switch (i.type) {
  //     case "ingredient":


  //       break;

  //     case "utensil":
  //       if (utensilFilterDeux.indexOf(i.name.toLowerCase()) < 0) utensilFilterDeux.push(i.name.toLowerCase())
  //       break;

  //     case "appliance":
  //       deviceFilterDeux.push(i.name.toLowerCase())

  //       break;

  //   }
  // })





    // console.log(...deviceFilter)
  // console.log(cards)
  // const applianceFiller = cards.map(e => {
  //   return e.appliance
  // })

  // console.log(...applianceFiller)

  // // const cardFilter = cards.filter(c => deviceFilter.includes(c.appliance))
  // // console.log(cardFilter)



  const updateCardFilters = (cards) => {
  console.log(cards)
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
  arr_u.forEach(e => document.getElementById("u-cocotte minute").style.display = "block")
  arr_a.forEach(e => document.getElementById("a-" + e).style.display = "block")

}

