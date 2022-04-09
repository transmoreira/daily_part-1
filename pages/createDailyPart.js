import { useState, Component } from "react"
import employees from "../src/data/employees.json"
import cars from "../src/data/cars.json"
import clients from "../src/data/clients.json"
import Table from "../src/components/Table"
import { dateFormated } from "../src/utils/utils"

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
            date: dateFormated(new Date(), false),
            driver: {
                name: "",
                registration: null
            },
            id: null,
            travels: [
            ]
        }
    })

    const [error, setError] = useState({ msg: "", type: "" })

    //onChange = onChange


    const closeMadal = () => {
        state.close = "close"
        setState({ ...state })
    }

    const inputValue = async () => {


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


            const dateStart = new Date()
            const dateEnd = new Date()
            const plate = state.dailyPart.car.plate

            const registration = state.dailyPart.driver.registration

            const response = await fetch(`api/dailyPart?start=${dateFormated(dateStart, false)}&end=${dateFormated(dateEnd, false)}&plate=${plate}&registration=${registration}`)

            const dailyPart = await response.json()
            if (dailyPart.length) {
                state.dailyPart = dailyPart[0]
                setState({ ...state })
            }

        }

        
        if (!state.dailyPart.client) {
            const list = clients.map(item => item.name)

            state.label = <>Qual a empresa <b>CLIENTE</b>?</>
            state.list = list
            state.type = "text"
            setState({ ...state })
            const client = await getData(list, "Cliente não encontrado")

            
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

                state.dailyPart.id = result.insertId
                setState({ ...state })
                addTravel()
            } catch (e) {
                console.log(e)
            }
            return
        }

        

        const countTravels = state.dailyPart.travels.length
        const actualtravel = state.dailyPart.travels[countTravels - 1]
        
        if (!actualtravel.destiny || actualtravel.endKM) {
            addTravel()

        } else {

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

            const actualDate = new Date()
            const timeTravel = `${dateFormated(actualDate, false)} ${endTime}:00`

            const travel = {
                ...actualtravel,
                endTime: timeTravel,
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
                state.dailyPart.travels[state.dailyPart.travels.length - 1] = travel
                setState({ ...state })
            } catch (error) {
                console.log(error)
            }

        }



    }


    const addTravel = async () => {

        state.closable = true

        const listClients = clients.map(item => item.name)
        const lines = clients[listClients.indexOf(state.dailyPart.client)].lines
        const list = lines.map(item => item.name)

        state.label = <>Qual é a <b>LINHA</b>?</>
        state.list = list
        state.type = "text"        
        const line = await getData(list, "Linha não encontrada")

        state.closable = false
        state.label = <>A viagem começou que <b>HORAS</b>?</>
        state.type = "time"
        state.list = []
        
        const startTime = await getData()

        state.label = <>A viagem começou com qual <b>KM</b>?</>
        state.type = "number"
        state.list = []        
        const startKM = await getData()

        const direction = lines.filter(item=>item.name==line)[0].direction

        state.label = <>De onde<b>(PONTO INICIAL)</b> sai a viagem?</>
        state.type = "text"
        state.list = direction      
        const origin = await getData(state.list, "Origem nao encontrada!")
        
        const destinys = [...direction.filter(item=>item!=origin)]
        state.label = <>Para onde<b>(PONTO FINAL)</b> vai a viagem?</>
        state.list =destinys
        const destiny = destinys.length == 1 ? destinys[0] : await getData(destinys, "Destino nao encontrado!")
        
        
        const actualDate = new Date()
        const timeTravel = `${dateFormated(actualDate, false)} ${startTime}:00`

        const travel = {
            id_daily_part: state.dailyPart.id,
            line,
            startKM,
            startTime: timeTravel,
            destiny,
            origin,
            endKM: null
        }

        console.log(travel)

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
            state.dailyPart.travels.push(travel)
            setState({ ...state })
           
        } catch (error) {
            console.log(error)
        }


    }

    const getData = (list = null, msgError = "") => {
        
                
            
        
        return new Promise((resolve, reject) => {
            state.close = ""
            setState({ ...state })
            const interval = setInterval(() => {
                
                if (valueInserted) {
                    
                    if (!list || list.includes(valueInserted)) {
                        clearInterval(interval)
                        resolve(valueInserted)
                        valueInserted = null
                        closeMadal()
                        error.msg = ""
                        error.type = ""
                        setError({ ...error })
                    } else {
                        error.msg = msgError
                        error.type = "error"
                        setError({ ...error })
                    }
                } else if (state.close === "close") {
                    clearInterval(interval)
                    //reject(valueInserted)
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
            <div className="info">TOQUE NA PARTE DIÁRIA PARA PREENCHE-LA</div>
            <Table onClick={inputValue} dailyPart={state.dailyPart} />
            <textarea placeholder="Descreva aqui observações sobre a viagem"/>
                   
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