import Head from "next/head"
import { useState } from "react"

import Table from "../src/components/Table"
import Filter from "../src/components/Filter"

import * as dailyPart from "../src/data/dailyPart.json"
import { filter } from "../src/utils/utils"




const Home = () => {

    const dailyParts = dailyPart.default;
    const starDate = new Date()
    starDate.setHours(0)
    starDate.setMinutes(0)
    starDate.setSeconds(0)
    const endDate = new Date(starDate)
    endDate.setDate(endDate.getDate() + 1)
    endDate.setSeconds(endDate.getSeconds() - 1)

    const filterDatas = {
        timeCourse: { start: starDate, end: endDate },
        client: "",
        line: ""
    }

    const listDailyPartsFiltered = filter(dailyParts,filterDatas)

     const[listDailyParts, setListDailyParts] = useState(listDailyPartsFiltered)

    return <>
        <Head>
            <title>Parte Diaria</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        {<Filter state={[listDailyParts, setListDailyParts]} />}
        <main>
            {listDailyParts.map((item, index) => <Table key={index} dailyPart={item} />)}
        </main>
    </>
}







export default Home