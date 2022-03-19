import { useState } from "react"


const Home = () => {
    
    return <div>
                <h1>HOME1</h1>
                <Counter/>
            </div> 
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