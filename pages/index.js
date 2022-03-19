import Head from "next/head"
import { useState } from "react"



const Home = () => {
    
    return <>
                <Head>
                    <title>Parte Diaria</title>
                </Head>
                <h1>HOME1</h1>
                <Counter/>
            </> 
}

const Counter = ()=>{
    const [count, setCount] = useState(1)
    const addCaount = ()=>{
        setCount(count + 1)
    }
    return  <div>
        <p>{count}</p>
        <button onClick={addCaount}>Adicionar</button>
    </div>
}

export default Home