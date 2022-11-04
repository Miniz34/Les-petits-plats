/* A function that creates a div element and returns it for selected tags */

export const TagRenderer = {
  tag: (f, color) => {
    const tag = document.createElement("div")
    tag.classList.add("selected-list", color)
    tag.setAttribute("color", color)
    tag.setAttribute("id", f)
    tag.innerHTML = `${f}<img src="assets/svg/close.svg" class="close-img close-filter" />`
    return tag
  },
}