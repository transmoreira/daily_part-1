import react from "react"
import Head from "next/head"
import { useState } from "react"
import Table from "../src/components/Table"
import Filter from "../src/components/Filter"

import cars from "../src/data/cars.json"
import employees from "../src/data/employees.json"
import clients from "../src/data/clients.json"
import Load from "../src/components/Load"

const Home = (props) => {

    const [listDailyParts, setListDailyParts] = useState([])
    const company = props.company

    const headers = [
        { label: "Carro", key: "number" },
        { label: "Placa", key: "plate" }
        /*{ label: "Matrícula", key: "registration" },
        { label: "Nome", key: "name" }*/
        /*{ label: "Nome", key: "name" },
        { label: "Origem/Destino", key: "direction" }*/
    ];

    const data = cars /* employees*/ /*clients[7].lines*/

    const csvReport = {
        data: data,
        headers: headers,
        title: 'Carros'
    };

    const countTravelsForLine = clients.reduce((acc, client) => {
        client.lines.map(line => {
            let countTravels = 0

            listDailyParts.forEach(dailyPart => {
                if (dailyPart.client == client.name) {
                    dailyPart.travels.forEach(travel => {
                        if (travel.line == line.name) {
                            countTravels++
                        }
                    })
                }
            })
            if(client.name!="urbano"){
                acc.push({ client: client.name, line: line.name, countTravels })
            }
            return acc
        }
            )
        return acc

    }, [])

 

    const kms = listDailyParts.map(dailyPart => {

        return dailyPart.travels.reduce((acc, travel) => {
            const km = travel.endKM ? travel.endKM - travel.startKM : 0

            travel.line == "DESLOCAMENTO OCIOSO"
                ? acc.unproductive += km
                : acc.productive += km
            return acc
        }, { unproductive: 0, productive: 0 })
    })

    const eventSendMail = async ()=>{
        
        if (prompt("Informe a senha...")=="Di1865"){
            const date = prompt("Informe a data")
            if (date){
            
                try{
                    const list = countTravelsForLine.filter(item=>item.countTravels==0).map(item=>`<td>${item.client}</td><td>${item.line}</td>`)
                    const body = JSON.stringify({
                        list,
                        date
                    })
                    const response = await fetch("/api/mail",{
                        method:"POST",
                        body
                    })
                    const res = await response.json()
                    //debugger
                    alert(res.message)
                }catch(e){
                    alert("Error: "+ e.message)
                }
            }
        }
    }


    return <>
        <Head>
            <title>Parte Diaria</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        {<Filter state={[listDailyParts, setListDailyParts]} company={company} kms={kms}/>}
        <button onClick={eventSendMail}>Enviar por email</button>
        <main>
            {
                listDailyParts.map((item, index) =>
                    <Table
                        key={index}
                        dailyPart={item}
                        company={company}
                        kms={kms[index]} />
                )
            }
            {/*<Admin {...csvReport}></Admin>*/}
        </main>
        <div className="lines no-print">
            <table>
                <thead>
                    <tr>
                        <th>CLIENTE</th>
                        <th>LINHA</th>
                        <th>QTD VIAGEM</th>
                    </tr>
                </thead>
                <tbody>
                    {countTravelsForLine.map((item,index)=>{
                        
                        return <tr key={index} className={!item.countTravels && "error"}>
                            <td className="text-left min-80">{item.client}</td>
                            <td className="text-left">{item.line}</td>
                            <td >{item.countTravels}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
        
    </>
}


export default Home
