import Head from "next/head"
import { useState } from "react"



const Home = () => {

    return <>
        <Head>
            <title>Parte Diaria</title>
        </Head>
        <h1>HOME1</h1>
        <Counter />
        <Pesquisacep />
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

const Pesquisacep = () => {

    const [cepResult, setCepResult] = useState("__.___-___")
    const [cepPesquisado, setCepPesquisado] = useState("")

    const meu_callback = () => {
    }

    const keyUp = (value) => {
        setCepPesquisado(value.target.value)
    }

    const buscar = async () => {

        const cep = cepPesquisado.replace(/\D/g, '');


        if (cep != "") {


            const validacep = /^[0-9]{8}$/;


            if (validacep.test(cep)) {


                const url = `https://viacep.com.br/ws/${cep}/json/`;

                const data = await fetch(url)
                const result = await data.json()
                setCepResult(result.logradouro)

            }
            else {
                setCepResult("Formato de CEP inválido.");
            }
        }


    }

    return <div>
        <input onKeyUp={keyUp} />
        <button onClick={buscar}>Buscar</button>
        <p>{cepResult}</p>
    </div>
}



export default Home