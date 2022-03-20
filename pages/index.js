import Head from "next/head"
import { useState } from "react"
import daily_parts from "../src/data/daily_parts"
import Table from "../src/components/Table"
import Filter from "../src/components/Filter"



const Home = () => {
    const [listDailyParts, setListDailyParts] = useState(daily_parts)
    
    return <>
        <Head>
            <title>Parte Diaria</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        <Filter state={[listDailyParts, setListDailyParts]}/>
        <main>
            {listDailyParts.map(item => <Table key={item.id} dailyPart={item} />)}
        </main>
    </>
}





export default Home