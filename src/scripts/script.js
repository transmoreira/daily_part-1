const table = document.querySelector("table")
const plateElement = document.querySelector("#plate")
const carElement = document.querySelector("#car")
const dateElement = document.querySelector("#date")
const clietsElement = document.querySelector("#client")
const registrationElement = document.querySelector("#registration")
const nameElement = document.querySelector("#name")
const input = document.querySelector("[data-js='data']")
const modal = document.querySelector(".modal")
const modalClose = document.querySelector(".modal .close")
const inconsistency = document.querySelector(".inconsistency")
const rows = [...document.querySelectorAll("tbody tr")]

let cars
let clients
let employees

console.log(location);



(async () => {
    const resultCars = await fetch("..//src/data/cars.json")
    cars = await resultCars.json()

    const resultClients = await fetch("..//src/data/clients.json")
    clients = await resultClients.json()

    const resultEmployees = await fetch("..//src/data/employees.json")
    employees = await resultEmployees.json()


})();

const dateFormated = (time) => {
    const date = new Date(time)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${day <= 9 ? "0" + day : day}/${month <= 9 ? "0" + month : month}/${year}`
}



const dailyPart = {
    id: null,
    client: null,
    date: new Date().getTime(),
    driver: null,//JSON.parse(localStorage.getItem("driver")),
    car: null,
    travels: []
}

if (dailyPart.driver) {
    registrationElement.innerText = dailyPart.driver.registration
    nameElement.innerText = dailyPart.driver.name
}





dateElement.innerText = dateFormated(dailyPart.date)

table.addEventListener("click", (event) => {
    const elementClicked = event.target
    const isEditable = ![...elementClicked.classList].includes("no-editable")
    if (isEditable && elementClicked.innerText) {
        fill(elementClicked)
    } else {
        fill()
    }

})



/*const show = position=>{
    
    console.log(position.coords)
    document.write("<h1>"+position.coords.latitude+","+position.coords.longitude+"</h1>")
}

navigator.geolocation.getCurrentPosition(show)*/