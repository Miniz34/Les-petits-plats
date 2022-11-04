const SERVER = {
  url: 'http://localhost:5555',
  request_recipes: '/assets/recipes.json'
}

/* Call API */
export const API_DATABASE = {
  getRecipes: () => {

    let ls = localStorage.getItem("recipes")
    if (ls) {
      return new Promise((resolve) => { resolve(JSON.parse(ls)) })
    }
    return fetch(SERVER.url + SERVER.request_recipes)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('recipes', JSON.stringify(data))
        return data
      })
  }
}
