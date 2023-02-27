const fruitForm = document.querySelector('#fruitForm')
const fruitList = document.querySelector('#fruitSection ul')

fruitForm.addEventListener('submit', function(e){
    e.preventDefault()
    addFruit(e.target.fruitInput.value)
    e.target.reset()
})

function addFruit(fruit) {
    const li = document.createElement('li')
    li.textContent = `${fruit}`
    fruitList.appendChild(li)
}

fruitList.addEventListener('click', (e => e.target.remove()))
