const apiKey = require("./apiKey") 


const fruitForm = document.querySelector('#fruitForm')
const fruitList = document.querySelector('#fruitSection ul')
const calorieCount = document.querySelector('#calorieCount')


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
    let x = 0

    fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
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
        .then((data) => img.src = `${data.hits[0].largeImageURL}`)
        .catch(()=> img.src = "https://via.placeholder.com/150")

}

fruitList.addEventListener('click', (e => {
    e.target.closest('div').remove()
    calories = calories - JSON.parse(e.target.closest('div').querySelector('li').innerText).calories
    calorieCount.textContent = calories
}
))

//

/*async function fetchFryutData(fruit) {
    const res = await fetch(`api-url${fruit})
    const data = await res.json()
    addfruit(data)
    catch{}
}
*/
