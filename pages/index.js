import Head from "next/head"
import { useState } from "react"

import Table from "../src/components/Table"
import Filter from "../src/components/Filter"

import * as dailyPart from "../src/data/dailyPart.json"




const Home = () => {
    
    const [listDailyParts, setListDailyParts] = useState(dailyPart.default);
    
    
    
    return <>
        <Head>
            <title>Parte Diaria</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        {<Filter state={[listDailyParts, setListDailyParts]}/>}
        <main>
            {listDailyParts.map(item => <Table key={item.id} dailyPart={item} />)}
        </main>
    </>
}







export default Home