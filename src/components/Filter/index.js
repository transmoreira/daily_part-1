import { useState } from "react"
import clientsJSON from "../../data/clients.json"
import carsJSON from "../../data/cars.json"
import employeesJSON from "../../data/employees.json"
import { dateFormated } from "../../utils/utils"




const starDate = new Date()
starDate.setUTCHours(3)
starDate.setHours(0)
starDate.setMinutes(0)
starDate.setSeconds(0)


const endDate = new Date()
endDate.setUTCHours(3)
endDate.setHours(23)
endDate.setMinutes(59)
endDate.setSeconds(59)

const filterDatas = {
    timeCourse: { start: starDate, end: endDate },
    client: "",
    line: "",
    driver: "",
    car: ""
}
let dailyPart = []

const getDailyPartsInDataBase = async (company="RN") => {

    const response = await fetch(`api/dailyPart?start=${dateFormated(filterDatas.timeCourse.start, false)}&end=${dateFormated(filterDatas.timeCourse.end, false)}&company=${company}`)
    dailyPart = await response.json()

}


const Filter = (props) => {

    const [listDailyParts, setListDailyParts] = props.state
    const [lines, setLines] = useState([])
    const company = props.company
    
    const clients = clientsJSON.map(item => item.name)

    const onChange = (event) => {
        const element = event.target

        switch (element.id) {
            case "start":
            case "end":
                const newDate = new Date(element.value)
                newDate.setUTCHours(3)

                const shouldUpdatedata =
                    newDate.getTime() < filterDatas.timeCourse.start.getTime() ||
                    newDate.getTime() > filterDatas.timeCourse.end.getTime()
                console.log(shouldUpdatedata)

                switch (element.id) {

                    case "start":
                        filterDatas.timeCourse.start = newDate
                        if (shouldUpdatedata) {
                            update()
                        }
                        break;
                    case "end":
                        newDate.setSeconds(newDate.getSeconds() - 1)
                        newDate.setDate(newDate.getDate() + 1)
                        filterDatas.timeCourse.end = newDate
                        if (shouldUpdatedata) {
                            update()
                        }
                        break;
                }
                break
            case "client":
                filterDatas.client = element.children[element.value].innerText
                const lines = element.value > 0 ? clientsJSON[element.value - 1].lines.map(item => item.name) : []
                setLines(lines)
                break;
            case "line":
                filterDatas.line = element.value
                break;
            case "driver":
                filterDatas.driver = element.value
                break;
            case "car":
                filterDatas.car = element.value
                break;
        }

        newFilter()
    }


    const update = async (event) => {   
        console.log(filterDatas)
        if (event) {
            event.preventDefault()
            event.target.classList.add("disable")
        }
        
        await getDailyPartsInDataBase(company)
        newFilter()
        if(event){
            event.target.classList.remove("disable")
        }
    }



    const newFilter = () => {

        
        const newList = dailyPart.filter((item, index) => {
            const date = new Date(item.date)
            date.setUTCHours(3)

            const isBetweenDate = date.getTime() >=
                filterDatas.timeCourse.start.getTime() &&
                date.getTime() <= filterDatas.timeCourse.end.getTime()

            const hasClient = (filterDatas.client == "" ||
                item.client == filterDatas.client)

            const hasDriver = (filterDatas.driver == "" ||
                item.driver.name == filterDatas.driver)

            const hasCar = (filterDatas.car == "" ||
                item.car.number == filterDatas.car)

            const hasLine = (filterDatas.line == "" ||
                item.travels
                    .map(item => item.line)
                    .filter(item => item == filterDatas.line).length > 0)

            return isBetweenDate && hasClient && hasDriver && hasCar && hasLine
        })

        setListDailyParts(newList)
    }



    return <article className="filter no-print">
        < p > Filtros</p >
        <form>
            <div>

                Período:
                <input type="date" id="start" onChange={onChange} />
                à
                <input type="date" id="end" onChange={onChange} />

            </div>
            <div>
                Cliente:
                <select id="client" onChange={onChange}>
                    <option key={0} value={0}></option>
                    {clients.map((item, index) =>
                        <option key={index} value={index + 1}>{item}</option>)}
                </select>
                Linha:
                <input id="line" onChange={onChange} list="listLine" />
                <datalist  key={1} id="listLine">
                    {lines.map((item, index) =>
                        <option key={index} >{item}</option>)}
                </datalist>
            </div>
            <div>
                Carro:
                <input id="car" onChange={onChange} list="listCars" />
                <datalist  key={2} id="listCars">
                    {carsJSON.map((car, index) =>
                        <option key={index} >{car.number}</option>)}
                </datalist>
                Motorista:
                <input id="driver" onChange={onChange} list="listDriver" />
                <datalist  key={3} id="listDriver">
                    {employeesJSON.map((employee, index) =>
                        <option key={employee.registration} value={employee.name}>{employee.registration}</option>)}
                </datalist>
            </div>
            <div>

                <button onClick={update}>Atualizar</button>
            </div>
        </form>
        <span>{listDailyParts.length} parte(s) diaria(s)</span>
    </article >
}

export default Filter
