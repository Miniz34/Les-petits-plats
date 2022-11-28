const maxDescriptionChars = 180;

// Card Renderer (object that contains a method for each element to display)
export const CardRenderer = {
  preview: (card) => `<div class="recipe-img"></div>`,

  name: (card) => `<div class="content-title"><div class="title">${card.name}</div>`,

  ingredient: (i) => `<p class="ingredient"> <strong> ${i.ingredient}</strong> ${i.quantity ? ":" + i.quantity + (i.unit ? i.unit : "") : ""} </p>`,

  ingredients: (card) => `<div class="content-ingredient"><div class="ingredients">${card.ingredients.map(i => CardRenderer.ingredient(i)).join("")}</div></div>`,

  duration: (card) => `<div class="duration">
			<div class="clock"><span><img src="assets/svg/clock.svg" class="clock-img" /></span></div>
			<div class="timer"><p>${card.time} min</p></div>
		</div>`,

  description: (card) => {
    let c = card.description
    if (c.length > maxDescriptionChars) c = (c.split('').slice(0, maxDescriptionChars)).join('') + '…'
    return `<div class="content-description" style:><p class="description">${c}</p></div>`
  },

  description2: (card) => `<div class="content-description" style:><p class="description">${(card.description.length > maxDescriptionChars) ? (card.description.split('').slice(0, maxDescriptionChars)).join('') + '…' : card.description}</p></div>`,

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


/**
 * It takes an array of objects, and displays the objects that match the search criteria.
 * @param recipeList - an array of objects that contain the recipe cards
 */
export const displayCards = (recipeList) => {
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
