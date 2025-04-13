const locationInput = document.querySelector('.main-form')

locationInput.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e.target.childNodes[1].value)
})
