import Head from "next/head"
import { useState } from "react"
import Table from "../src/components/Table"
import Filter from "../src/components/Filter"

const Home = () => {

    const [listDailyParts, setListDailyParts] = useState([])    
    
   
    return <>
        <Head>
            <title>Parte Diaria</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        {<Filter state={[listDailyParts, setListDailyParts]} />}
        <main>
            {listDailyParts.map((item, index) => <Table key={index} dailyPart={item} utc="3"/>)}
        </main>
    </>
}


export default Home
