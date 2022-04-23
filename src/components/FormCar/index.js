import clients from "../../data/clients.json"
const FormCar = ()=>{
    console.log(clients)
    return<>
        <h3>Linhas:</h3>
        <table>
            <tr>
                <th>Nome</th>
                <th>Origem Destino</th>
            </tr>
            {
                clients[1].lines.map(line=>
                        <tr>
                            <td className="min-500">{line.name}</td>
                            <td className="min-500">
                                <ol>
                                    {line.direction.map(direction=>
                                        <li>{direction}</li>
                                    )}
                                </ol>
                            </td>
                        </tr>
                    )
            }
        </table>
    </>
}

export default FormCar