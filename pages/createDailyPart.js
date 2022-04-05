import { useState, Component } from "react"
import employees from "../src/data/employees.json"
import cars from "../src/data/cars.json"
import clients from "../src/data/clients.json"
import Table from "../src/components/Table"

let valueInserted
const Modal = () => {


    const [state, setState] = useState({
        label: "",
        close: "close",
        value: "",
        list: [],
        type: "text",
        dailyPart: {
            car: { number: '', plate: '' },
            client: "",
            date: new Date().toJSON(),
            driver: {
                name: "",
                registration: null
            },
            id: null,
            travels: [
                {
                    destiny: "",
                    direction: 1,
                    endKM: null,
                    endTime: "",
                    line: "",
                    origin: "",
                    startKM: null,
                    startTime: null
                }]
        }
    })

    const [error, setError] = useState({ msg: "", type: "" })

    //onChange = onChange


    const closeMadal = () => {
        state.close = "close"
        setState({ ...state })
    }

    const openMadal = async () => {

        state.close = ""
        state.closable = true

        if (!state.dailyPart.driver.registration) {
            const list = employees.map(item => item.registration)
            state.label = <>Qual é sua <b>MATRÍCULA</b>?</>
            state.list = []
            state.type = "number"
            setState({ ...state })

            const registration = await getData(list, "Matrícula não encontrada.")
            state.dailyPart.driver = {
                registration,
                name: employees[list.indexOf(registration)].name
            }

        }

        if (!state.dailyPart.car.number) {
            const list = cars.map(item => item.number)

            state.label = <>Qual o número do <b>CARRO</b>?</>
            state.list = list
            state.type = "number"
            setState({ ...state })
            const carNumber = await getData(list, "Carro não encontrado")

            state.dailyPart.car = {
                number: carNumber,
                plate: cars[list.indexOf(carNumber)].plate
            }

        }

        const lines = []
        if (!state.dailyPart.client) {
            const list = clients.map(item => item.name)

            state.label = <>Qual a empresa <b>CLIENTE</b>?</>
            state.list = list
            state.type = "text"
            setState({ ...state })
            const client = await getData(list, "Cliente não encontrado")

            lines.push(...clients[list.indexOf(client)].lines)
            state.dailyPart.client = client
            try {


                const response = await fetch(
                    "api/dailyPart",
                    {
                        method: "POST",
                        body: JSON.stringify(state.dailyPart)
                    }
                )
                const result = await response.json()
                console.log(result)
                state.dailyPart.id = result.insertId
                setState({ ...state })
                addTravel(lines)
            } catch (e) {
                console.log(e)
            }
            return
        }

        const countTravels = state.dailyPart.travels.length
        const actualtravel = state.dailyPart.travels[countTravels-2]
        
        if (!actualtravel.destiny) {
            addTravel(lines)
        }else{
            updateTravel(actualtravel)
        }            

        closeMadal()

    }

    const updateTravel = async () => {

        state.label = <>A viagem terminou que <b>HORAS</b>?</>
        state.type = "time"
        state.list = []
        setState({ ...state })
        const endTime = await getData()

        state.label = <>A viagem terminou com qual <b>KM</b>?</>
        state.type = "number"
        state.list = []
        setState({ ...state })
        const endKM = await getData()

        state.label = <>Quantos <b>passageiros</b> embarcaram?</>
        state.type = "number"
        setState({ ...state })
        const passenger = await getData()
        
        const travel = {
            ...actualtravel,
            endTime,
            endKM,
            passenger
        }

        try {
            const response = await fetch(
                "api/travels",
                {
                    method: "PUT",
                    body: JSON.stringify(travel)
                }
            )

            const result = await response.json()            
            travel.id = result.insertId
            state.dailyPart.travels[state.dailyPart.travels-2] = travel
            setState({ ...state })
        } catch (error) {
            console.log(error)
        }
    }

    const addTravel = async (lines) => {

        state.closable = false


        const list = lines.map(item => item.name)

        state.label = <>Qual é a <b>LINHA</b>?</>
        state.list = list
        state.type = "text"
        setState({ ...state })
        const line = await getData(list, "Linha não encontrada")

        const { origin, destiny } = lines[list.indexOf(line)]
        
        state.label = <>A viagem começou que <b>HORAS</b>?</>
        state.type = "time"
        state.list = []
        setState({ ...state })
        const startTime = await getData()

        state.label = <>A viagem começou com qual <b>KM</b>?</>
        state.type = "number"
        state.list = []
        setState({ ...state })
        const startKM = await getData()

        state.label = <>De onde<b>(PONTO INICIAL)</b> sai a viagem?</>
        state.type = "text"
        state.list = [origin, destiny]
        setState({ ...state })

        const direction = state.list.indexOf(await getData(state.list, "Origem nao encontrada!")) == 1 ? 1 : 2

        const hourDailyPart = new Date(state.date).getHours()
        const actualDate = new Date()
        actualDate.setHours(startTime.split(":")[0])
        actualDate.setMinutes(startTime.split(":")[1])
        const timeTravel = new Date(actualDate)

        const travel = {
            id_daily_part:state.dailyPart.id,
            line,
            startKM,
            startTime: timeTravel,
            direction,
            destiny,
            origin,
            endKM: startKM
        }

        

        try {
            const response = await fetch(
                "api/travels",
                {
                    method: "POST",
                    body: JSON.stringify(travel)
                }
            )

            const result = await response.json()            
            travel.id = result.insertId
            state.dailyPart.travels.splice(state.dailyPart.travels.length - 1, 0, travel)
            setState({ ...state })
        } catch (error) {
            console.log(error)
        }

        closeMadal()
    }

    const getData = (list = null, msgError = "") => {

        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (valueInserted) {
                    if (!list || list.includes(valueInserted)) {
                        clearInterval(interval)
                        resolve(valueInserted)
                        valueInserted = null
                    } else {
                        error.msg = msgError
                        error.type = "error"
                        setError({ ...error })
                    }
                }
            }, 100)
        })
    }

    const clicked = () => {
        valueInserted = state.value
    }

    const onChange = (event) => {
        state.value = event.target.value
        setState({ ...state })
    }


    return <>
        <main>
            <span className="info">TOQUE NA PARTE DIÁRIA PARA PREENCHE-LA</span>
            <Table onClick={openMadal} dailyPart={state.dailyPart} />

        </main>

        <div className={`modal ${state.close}`}>
            <div className="content-modal">
                {state.closable ? <span className="close" onClick={closeMadal}>x</span> : ""}
                <label>{state.label}</label>
                <input
                    type={state.type}
                    data-js="data"
                    placeholder="Toque aqui para digitar"
                    list="list"
                    onChange={onChange}
                    value={state.value} />
                <datalist id="list">{state.list.map((item, index) => <option key={index}>{item}</option>)}</datalist>
                <span className={`inconsistency ${error.type}`}>{error.msg}</span>
                <button onClick={clicked}>OK</button>

            </div>
        </div>

    </>
}


export default Modal