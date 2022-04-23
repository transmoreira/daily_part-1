import { useState } from "react"

export default (props) => {
    const { headers, data, title } = props
    const [state, setState] = useState(data)

    const filter = (event) => {
        const inputValue = event.target.value.toUpperCase()
        const resultFilter = data.filter(
            item => {
                let hasvalue = false
                headers.forEach(key => {
                    if (item[key.key].toUpperCase().indexOf(inputValue) >= 0) {
                        hasvalue = true
                    }
                })
                return hasvalue
            }
        )
        setState(resultFilter)
    }

    const remove = async (index) => {
        const indexClicked = index.target.dataset.js
        const objectToRemove = state[indexClicked]
        const indexObjectToRemove = data.indexOf(objectToRemove)
        const labelTitle = {
            Carros:"car",
            Funcionarios:"employee",            
        }
        console.log(await fetch("../api/"+labelTitle[title],{method:"DELETE",body:JSON.stringify({index:indexObjectToRemove})}))
    }

    return <>
        <div className="modal">
            <form>
                <h1>{title}</h1>
                <div>
                    <input placeholder="Pesquise aqui" onChange={filter} />
                    <table>
                        <thead>
                            <tr>
                                {
                                    headers.map(({ label }) => <th key={label}>{label}</th>)
                                }
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.map((row, index) =>
                                <tr key={index}>{
                                    headers.map(({ key }) => {
                                        if (key == "direction") {
                                            return <td key={key}>{
                                                <ol>
                                                    {
                                                        row[key].map(direction =>
                                                            <li key={direction}>{direction}</li>
                                                        )
                                                    }
                                                </ol>
                                            }</td>
                                        }
                                        return <td key={key}>{row[key]}</td>
                                    })
                                }
                                    <td data-js="remove" className="min"><span data-js={index} title="Excluir" onClick={remove}>x</span></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    </>
}