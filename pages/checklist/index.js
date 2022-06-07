import Inspecao from "../../src/components/Inspecao"
import listInspect from "../../src/components/Inspecao/listInspect.json"

export default ()=>{

    const date = new Date()
    const month = date.getMonth()
    const year = date.getFullYear()
    const header = {
        month:months[month]+"/"+year,
        car:{
            plate:"XXX-0000",
            number:"51521",
            year:2019,
            model:"Comil",
            type:"Micro",
            capacity:"49 L"
        },
        unidade:"TAM/CTF",
        company:"Rio Negro"

    }
   
    
    return <div style={{padding:50}}><Inspecao header={header} body={listInspect}/></div>
}

const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
]