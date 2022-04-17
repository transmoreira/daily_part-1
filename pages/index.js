import Head from "next/head"
import { useState } from "react"
import Table from "../src/components/Table"
import Filter from "../src/components/Filter"

const Home = (props) => {

    const [listDailyParts, setListDailyParts] = useState([])    
    const company = props.company
   console.log(company)
    return <>
        <Head>
            <title>Parte Diaria</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        {<Filter state={[listDailyParts, setListDailyParts]} company={company}/>}
        <main>
            {listDailyParts.map((item, index) => <Table key={index} dailyPart={item}  company={company}/>)}
        </main>
    </>
}


export default Home
