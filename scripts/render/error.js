

/**
 * Generate error into the DOM
 */
export function generateError() {
  const recipeCards = document.querySelector(".recipe-list")
  const main = document.querySelector("main")
  const div = document.createElement("div")
  div.classList.add("recipe-none")
  div.innerHTML = `<p class="test-error">Veuillez plutot essayer <a href="" class="test-tarte">Tarte</a> ou <a href="" class="test-salad">Salade</a></p>`
  div.style.display = "none"
  main.insertBefore(div, recipeCards)
}