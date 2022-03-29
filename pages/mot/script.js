
import * as carsObj from "../../src/data/cars.json"
import * as clientsObj from "../../src/data/clients.json"
import * as employeesObj from "../../src/data/employees.json"


const cars = carsObj.default
const clients = clientsObj.default
const employees = employeesObj.default

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

const fill = async () => {

    try {

        if (!dailyPart.driver) {
            const list = employees.map(item => item.registration)
            const registration = await modalShow("Qual é sua <b>MATRÍCULA</b>?", list, "number")
            dailyPart.driver = {
                registration,
                name: employees[list.indexOf(registration)].name
            }

            registrationElement.innerText = dailyPart.driver.registration
            nameElement.innerText = dailyPart.driver.name

            localStorage.setItem("driver", JSON.stringify(dailyPart.driver))
        }

        if (!dailyPart.car) {
            const defaultCar = JSON.parse(localStorage.getItem("car"))
            const defaultValue = defaultCar ? defaultCar.number : ""
            const list = cars.map(item => item.number)
            const car = await modalShow("Qual o número do <b>CARRO</b>?", list, "number", true, defaultValue)
            dailyPart.car = {
                number: car,
                plate: cars[list.indexOf(car)].plate
            }

            carElement.innerText = dailyPart.car.number
            plateElement.innerText = dailyPart.car.plate
            localStorage.setItem("car", JSON.stringify(dailyPart.car))
        }

        if (!dailyPart.client) {
            const list = clients.map(item => item.name)
            const client = await modalShow("Qual é o <b>CLIENTE</b>?", list, "text", true)
            dailyPart.client = client

            client.innerText = dailyPart.client
            clietsElement.innerText = dailyPart.client
            fetch(/*"https://daily-part-rho.vercel.app/"*/
                "http://localhost:3000/",
                { method: "POST", body: JSON.stringify(dailyPart) })
        }

        for (let i = 0; i < rows.length; i++) {
            const lines = clients.filter(item => item.name == dailyPart.client)[0].lines.sort((a, b) => a.name > b.name ? 1 : -1)
            console.log(lines)
            const fieldsForFill = [...rows[i].children]

            if (!dailyPart.travels[i]) {
                const list = lines.map(item => item.name)
                const line = await modalShow("Qual é a <b>LINHA</b>?", list, "text", true)
                modalClose.style.display = "none"
                const startTime = await modalShow("Qual é o <b>HORÁRIO</b>?", null, "time")
                const startKM = await modalShow("Qual é o <b>KM INICIAL</b>?", null, "number")

                const origins = lines.filter(item => item.name == line).map(item => [item.origin, item.destiny])[0]

                const origin = await modalShow("De onde sai<b>(ORIGEM)</b> a viagem?", origins, "text", true)
                const indexDestiny = origins.indexOf(origin) == 0 ? 1 : 0
                const destiny = origins[indexDestiny]

                const travel = {
                    line,
                    startTime,
                    startKM,
                    origin,
                    destiny
                }

                dailyPart.travels.push(travel)

                fieldsForFill[0].innerText = line
                fieldsForFill[1].innerText = startTime
                fieldsForFill[3].innerText = startKM
                fieldsForFill[7].innerText = origin
                fieldsForFill[8].innerText = destiny

                modalClose.style.display = "block"

                break

            }
            if (!dailyPart.travels[i].endTime) {
                const travel = dailyPart.travels[i]
                const endTime = await modalShow("Que <b>HORAS</b> você chegou em " + travel.destiny + "?", null, "time")
                modalClose.style.display = "none"
                const endKM = await modalShow("Qual o <b>KM final</b>?", null, "number")
                const amountPassenger = await modalShow("Embarcou quantos passageiros?", null, "number", false, 0)

                travel.endTime = endTime
                travel.endKM = endKM

                dailyPart.travels[i] = travel

                fieldsForFill[2].innerText = endTime
                fieldsForFill[4].innerText = endKM
                fieldsForFill[5].innerText = endKM - travel.startKM
                fieldsForFill[6].innerText = amountPassenger
                console.log(JSON.stringify(dailyPart))

                modalClose.style.display = "block"
                break
            }
        }
    } catch (error) {
        console.log(error)
    }
}


const modalShow = (message, list, type, showlist, defaultValue = "") => {
    //input.value = defaultValue
    const listOptions = document.querySelector("#list")
    listOptions.innerHTML = ""
    if (list && showlist) {
        listOptions.innerHTML = list.map(item => `<option value="${item}">${item}</option>`).join("")
    }
    //input.type = type


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

        //input.addEventListener("keyup", eventInput)

        const eventListener = (event) => {

            if (event.target.className == "close") {
                modal.style.display = "none"
                reject()
                return
            }

           /* if ([...inconsistency.classList].includes("error") || !input.value) {
                return
            }*/

            resolve(modal.querySelector("input").value)

            //input.value = ""
            modal.style.display = "none"


            modal.querySelector("button").removeEventListener('click', eventListener, false)
            modalClose.removeEventListener('click', eventListener, false)
            //input.removeEventListener('click', eventInput, false)
        }



        modal.querySelector("button").addEventListener("click", eventListener, false)
        modalClose.addEventListener("click", eventListener, false)
    })


}



const handleClick = () => {
    //fill()
    
}

export { handleClick }

/*const show = position=>{
    
    console.log(position.coords)
    document.write("<h1>"+position.coords.latitude+","+position.coords.longitude+"</h1>")
}

navigator.geolocation.getCurrentPosition(show)*/