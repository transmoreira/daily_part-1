import Head from "next/head"
import { useState } from "react"



const Home = () => {

    return <>
        <Head>
            <title>Parte Diaria</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        <h1>HOME1</h1>
        <Counter />
        <PesquisaName />
    </>
}

const Counter = () => {
    const [count, setCount] = useState(1)
    const addCaount = () => {
        setCount(count + 1)
    }
    return <div>
        <p>{count}</p>
        <button onClick={addCaount}>Adicionar</button>
    </div>
}

const PesquisaName = () => {


    const [name, setName] = useState(0)
    const buscar = async () => {


        const url = `https://gorest.co.in/public/v2/users`;

        const data = await fetch(url)
        const result = await data.json()
        const random = Math.floor(Math.random()*result.length)
        setName(result[random].name)
        
    }

    return <div>
        <button onClick={buscar}>Buscar</button>
        <p>{name}</p>
    </div>
}



export default Home