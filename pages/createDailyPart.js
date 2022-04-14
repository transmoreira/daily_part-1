import { useState, Component } from "react"
import employees from "../src/data/employees.json"
import cars from "../src/data/cars.json"
import clients from "../src/data/clients.json"
import Table from "../src/components/Table"
import { dateFormated } from "../src/utils/utils"

const actualDate = new Date()
actualDate.setHours(11)
let valueInserted
let timeout

const Modal = () => {
    const [error, setError] = useState({ msg: "", type: "" })
    const [state, setState] = useState({
        label: "",
        close: "close",
        value: "",
        list: [],
        type: "text",
        dailyPart: {
            car: { number: '', plate: '' },
            client: "",
            date: dateFormated(actualDate, false),
            driver: {
                name: "",
                registration: null
            },
            id: null,
            travels: [
            ]
        }
    })

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


            
            const plate = state.dailyPart.car.plate

            const registration = state.dailyPart.driver.registration
            await getDailyPart(plate,registration)

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
            } catch (erro) {
                 console.log(erro.message)
                //location.reload(true)
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
            const endKM = parseInt(await getData(null, "Verifique se o KM está correto.", true))

            state.label = <>Quantos <b>passageiros</b> embarcaram?</>
            state.type = "number"
            setState({ ...state })
            const passenger = parseInt(await getData())

            
            const timeTravel = `${dateFormated(actualDate, false)} ${endTime}:00`

            const travel = {
                ...actualtravel,
                endTime: timeTravel,
                endKM,
                passenger
            }

            updateTravel(travel)
        }
    }
    
    const getDailyPart = async (plate,registration)=>{
           try {
                const response = await fetch(`api/dailyPart?start=${dateFormated(actualDate, false)}&end=${dateFormated(actualDate, false)}&plate=${plate}&registration=${registration}`)

                const dailyPart = await response.json()
                if (dailyPart.length) {
                    state.dailyPart = dailyPart[0]
                    setState({ ...state })
                }
            } catch (erro) {
                console.log(erro.message)
                //location.reload(true)
                getDailyPart(plate,registration)
            }   
    }
    
    const updateTravel = async (travel)=>{
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
        } catch (erro) {
             console.log(erro.message)
            //location.reload(true)
            updateTravel(travel)
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
        const msg = "Verifique se o KM está correto."
        const startKM = parseInt(await getData(null, msg, true))

        const direction = lines.filter(item => item.name == line)[0].direction

        state.label = <>De onde<b>(PONTO INICIAL)</b> sai a viagem?</>
        state.type = "text"
        state.list = direction
        const origin = await getData(state.list, "Origem nao encontrada!")

        const destinys = [...direction.filter(item => item != origin)]
        state.label = <>Para onde<b>(PONTO FINAL)</b> vai a viagem?</>
        state.list = destinys
        const destiny = destinys.length == 1 ?
            destinys[0] :
            await getData(destinys, "Destino nao encontrado!")


        
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


        setTraveal(travel)


    }
    
    const setTraveal = async (travel)=>{
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

        } catch (erro) {
             console.log(erro.message)
                //location.reload(true)
            setTraveal(travel)
        }  
    }

    const getData = (list = null, msgError = "", shouldCheckKM = false) =>
        new Promise((resolve, reject) => {
            const checkKM = (km) => {
                const countTravels = state.dailyPart.travels.length
                if (countTravels === 0) {
                    return km > 0//TEMP buscar km dia anterior ou algo parecido
                }

                //const travel = state.dailyPart.travels[countTravels - 1]

                //const halfDistance = Math.floor(distance/2)
                const minimumDistance = 0//distance - halfDistance
                const maximumDistance = 120//distance + halfDistance
                const previousKM = state.dailyPart.travels[countTravels - 1].endKM ||
                    state.dailyPart.travels[countTravels - 1].startKM

                console.log(previousKM)
                return km >= (previousKM + minimumDistance) &&
                    km <= (previousKM + maximumDistance)
            }
            state.close = ""
            state.value = ""
            setState({ ...state })
            const interval = setInterval(() => {

                if (valueInserted) {
                    if (!list || list.includes(valueInserted)) {
                        if (shouldCheckKM && !checkKM(valueInserted)) {
                            error.msg = msgError
                            error.type = "error"
                        } else {
                            clearInterval(interval)
                            resolve(valueInserted)
                            valueInserted = null
                            closeMadal()
                            error.msg = ""
                            error.type = ""
                        }
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

    const onclickOK = () => {
        valueInserted = state.value
    }

    const onChangeInput = (event) => {
        state.value = event.target.value
        setState({ ...state })
    }

    const onChangeObs = (event) => {
        const callback = () => {
            clearTimeout(timeout)
            try {
                fetch("api/dailyPart",
                    {
                        method: "PUT",
                        body: JSON.stringify(state.dailyPart)
                    }
                )
            } catch (e) {
                console.log(e)
            }

        }

        state.dailyPart.obs = event.target.value

        setState({ ...state })
        clearTimeout(timeout)
        timeout = setTimeout(callback, 1000);
    }

   // inputValue()

    return <>
        <main>
            <div className="info">TOQUE NA PARTE DIÁRIA PARA PREENCHE-LA</div>
            <Table onClick={inputValue} dailyPart={state.dailyPart} utc="0"/>
            <textarea
                placeholder="Descreva aqui observações sobre a viagem"
                onChange={onChangeObs}
                value={state.dailyPart.obs} />

        </main>

        <div className={`modal ${state.close}`}>
            <div className="content-modal">
                {state.closable ? <span className="close"
                    onClick={closeMadal}>x</span> : ""}
                <label>{state.label}</label>
                <input
                    type={state.type}
                    placeholder="Toque aqui para digitar"
                    list="list"
                    onChange={onChangeInput}
                    value={state.value} />
                <datalist id="list">
                    {
                        state.list.map((item, index) =>
                            <option key={index}>{item}</option>)
                    }
                </datalist>
                <span className={`inconsistency ${error.type}`}>
                    {error.msg}
                </span>
                <button onClick={onclickOK}>OK</button>

            </div>
        </div>

    </>
}


export default Modal
