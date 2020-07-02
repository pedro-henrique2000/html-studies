const buttonSearch = document.querySelector("#page-home main a")
const modalDiv = document.querySelector('#modal')
const close = document.querySelector('#modal .header a')

buttonSearch.addEventListener("click", () => {
    console.log("aa")
    modalDiv.classList.remove("hide")
})

close.addEventListener("click", () => {
    modalDiv.classList.add("hide")
})

