let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toysUrl = 'http://localhost:3000/toys/'
  const toyForm = document.querySelector(".add-toy-form")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  fetch(toysUrl)
    .then(resp => resp.json())
    .then(data => data.forEach(toy => renderToy(toy)
    ))
  
  function renderToy(toy) {
    const toyCollection = document.querySelector('#toy-collection')
    const toyDiv = document.createElement("div")
    toyDiv.dataset.id = toy.id
    toyDiv.className = 'card'
    toyDiv.innerHTML = `
    <h>${toy.name}</h>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
    `
    toyCollection.append(toyDiv)
  }
  
  toyForm.addEventListener("submit", e => {
    e.preventDefault()
    const name = toyForm.name.value
    const image = toyForm.image.value
    
    fetch(toysUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
    }).then(resp => resp.json())
      .then(object => renderToy(object))
  })
  

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })
  
  document.addEventListener('click', e => {
    if (e.target.matches('.like-btn')) {
      let likeHTMLloc = e.target.previousElementSibling
      let likeText = likeHTMLloc.innerText.split(' ')
      let likeNum = likeText[0]
      likeNum++
      likeText[0] = likeNum
      likeText = likeText.join(' ')
      likeHTMLloc.innerText = likeText
      
      const button = e.target
      const cardId = button.parentNode.dataset.id

      const configObj = {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({ likes: likeNum })
      }
            
      fetch(toysUrl + cardId, configObj)
    }
    })  
})