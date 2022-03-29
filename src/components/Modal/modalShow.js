const modalShow = (message, list, type, showlist, defaultValue = "") => {
    input.value = defaultValue
    const listOptions = document.querySelector("#list")
    listOptions.innerHTML = ""
    if (list && showlist) {
        listOptions.innerHTML = list.map(item => `<option value="${item}">${item}</option>`).join("")
    }
    input.type = type


    return new Promise((resolve, reject) => {
        modal.style.display = "flex"
        modal.querySelector("label").innerHTML = message


        const eventInput = event => {

            if (!list || list.includes(event.target.value)) {
                inconsistency.innerText = ""
                inconsistency.classList.remove("error")
            } else {
                inconsistency.innerText = "Dado incorreto"
                inconsistency.classList.add("error")

            }

        }

        input.addEventListener("keyup", eventInput)

        const eventListener = (event) => {

            if (event.target.className == "close") {
                modal.style.display = "none"
                reject()
                return
            }

            if ([...inconsistency.classList].includes("error") || !input.value) {
                return
            }

            resolve(modal.querySelector("input").value)

            input.value = ""
            modal.style.display = "none"


            modal.querySelector("button").removeEventListener('click', eventListener, false)
            modalClose.removeEventListener('click', eventListener, false)
            input.removeEventListener('click', eventInput, false)
        }



        modal.querySelector("button").addEventListener("click", eventListener, false)
        modalClose.addEventListener("click", eventListener, false)
    })


}

export default modalShow