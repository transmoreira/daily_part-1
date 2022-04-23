import Head from "next/head"
import { useState } from "react"
import Table from "../src/components/Table"
import Filter from "../src/components/Filter"
import Admin from "./admin"
import cars from "../src/data/cars.json"
import employees from "../src/data/employees.json"
import clients from "../src/data/clients.json"

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
    
    return <>
        <Head>
            <title>Parte Diaria</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
       
        {<Filter state={[listDailyParts, setListDailyParts]} company={company}/>}
        <main>
            {listDailyParts.map((item, index) => <Table key={index} dailyPart={item}  company={company}/>)}
            <Admin {...csvReport}></Admin>
        </main>
        
    </>
}


export default Home
