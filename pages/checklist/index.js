import Inspecao from "../../src/components/Inspecao"

export default ()=>{

    const date = new Date()
    const month = date.getMonth()
    const year = date.getFullYear()
    const header = {
        month:months[month]+"/"+year
    }
    return <Inspecao header={header}/>
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