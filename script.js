// require('dotenv').config()
// const apiKey = process.env.APIKEY

const apiKey = "API key required"

const fruitForm = document.querySelector('#fruitForm')
const fruitList = document.querySelector('#fruitSection ul')
const calorieCount = document.querySelector('#calorieCount')
const createForm = document.querySelector('#createForm')
const deleteForm = document.querySelector('#deleteForm')

let calories = 0

fruitForm.addEventListener('submit', function(e){
    e.preventDefault()
    addFruit(e.target.fruitInput.value)
    e.target.reset()
})

function addFruit(fruit) {
    const h2 = document.createElement('h2')
    const li = document.createElement('li')
    const card = document.createElement('div')
    const img = document.createElement('img')
    let randomNum = Math.floor(Math.random()*20)

    fetch(`https://fruit-api-0y87.onrender.com/fruits/${fruit}`)
        .then((response) => response.json())
        .then((data) => {
            li.textContent = JSON.stringify(data.nutritions)
            calories = calories + data.nutritions.calories
            calorieCount.textContent = calories
        })
        .then(()=> {h2.innerHTML = fruit  
            card.appendChild(h2)
            card.appendChild(li)
            card.appendChild(img)
            fruitList.appendChild(card)})
        .catch((err) => console.log(err))

    fetch(`https://pixabay.com/api/?key=${apiKey}&q=${fruit}+fruit&image_type=photo`)
        .then((response) => response.json())
        .then((data) => img.src = `${data.hits[randomNum].largeImageURL}`)
        .catch(()=> img.src = "https://via.placeholder.com/150")

}

fruitList.addEventListener('click', (e => {
    e.target.closest('div').remove()
    calories = calories - JSON.parse(e.target.closest('div').querySelector('li').innerText).calories
    calorieCount.textContent = calories
}
))

createForm.addEventListener('submit', createNewFruit)

async function createNewFruit (e) {
    e.preventDefault()

    const data = {name: e.target.createInput.value}
    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch("https://fruit-api-0y87.onrender.com/fruits", options)

    if(response.status === 201){
        e.target.reset()
        alert('a new fruit was added')
    } else {
        e.target.reset()
        alert("That fruit already exists")
    }
}

deleteForm.addEventListener('submit', deleteFruit)

async function deleteFruit (e) {
    e.preventDefault()

    const data = {name: e.target.deleteInput.value}
    const options = {
        method: "delete",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch("https://fruit-api-0y87.onrender.com/fruits", options)

    if(response.status === 200){
        e.target.reset()
        alert('a fruit was deleted')
    } else {
        e.target.reset()
        alert("That fruit doesn't exist")
    }
}

