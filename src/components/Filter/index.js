import { useState } from "react"
import  clientsJSON from "../../data/clients.json"
import { dateFormated } from "../../utils/utils"


const starDate = new Date()
starDate.setTime(new Date(starDate.toLocaleDateString()).getTime())//zerando HH:mm:ss:mmm


const endDate = new Date(starDate)
endDate.setDate(endDate.getDate() + 1)
endDate.setSeconds(endDate.getSeconds() - 1)

const filterDatas = {
    timeCourse: { start: starDate, end: endDate },
    client: "",
    line: ""
}
let dailyPart = []

const Filter = (props) => {
   
    const [listDailyParts, setListDailyParts] = props.state
    const [lines, setLines] = useState([])
    
    const clients = clientsJSON.map(item => item.name)

    const onChange = (event) => {
        const element = event.target

        switch (element.id) {
            case "start":
            case "end":
                const newDate = new Date(element.value)
                newDate.setHours(newDate.getHours() + 3)
                switch (element.id) {
                    case "start":
                        filterDatas.timeCourse.start = newDate
                        break;
                    case "end":
                        newDate.setSeconds(newDate.getSeconds() - 1)
                        newDate.setDate(newDate.getDate() + 1)
                        filterDatas.timeCourse.end = newDate
                        break;
                }
                break
            case "client":
                filterDatas.client = element.children[element.value].innerText
                const lines = element.value > 0 ? clientsJSON[element.value - 1].lines.map(item => item.name) : []
                setLines(lines)
                break;
            case "line":
                filterDatas.line = element.value
                break;
        }
    }

    const getDailyPartsInDataBase = async () => {
        /*const dateStart = new Date()
        const dateEnd = new Date()
        dateStart.setDate(dateStart.getDate()-60)*/
        
        const response = await fetch(`api/dailyPart?start=${dateFormated(filterDatas.timeCourse.start,false)}&end=${dateFormated(filterDatas.timeCourse.end,false)}`)
        dailyPart = await response.json()
        
       
    }

    /*if(!dailyPart.length){
        getDailyPartsInDataBase()
    }*/

    const newFilter = async () => {
        await getDailyPartsInDataBase()
        const newList = dailyPart.filter((item, index) => {
           //console.log(filterDatas.timeCourse.start.getTime() , filterDatas.timeCourse.end.getTime())
           item.date.setUTCHours(3)
            return new Date(item.date).getTime() >= filterDatas.timeCourse.start.getTime() &&
                new Date(item.date).getTime() <= filterDatas.timeCourse.end.getTime() &&
                (filterDatas.client == "" || item.client == filterDatas.client) &&
                (filterDatas.line == "" || item.travels.map(item => item.line).filter(item => item == filterDatas.line).length > 0)
        })
        
        if(!newList.length){
            alert("Nada encontrado")
        }
        setListDailyParts(newList)
    }



    return <article className="filter">
        < p > Filtros</p >
        <form>
            <div>

                Período:
                <input type="date" id="start"  onChange={onChange} />
                à
                <input type="date" id="end" onChange={onChange} />

            </div>
            <div>
                Cliente:
                <select id="client" onChange={onChange}>
                    <option value={0}></option>
                    {clients.map((item, index) => <option key={index} value={index + 1}>{item}</option>)}
                </select>
                Linha:
                <input id="line" onChange={onChange} list="list" />
                <datalist id="list">
                    {lines.map((item, index) => <option key={index} >{item}</option>)}
                </datalist>
            </div>
            <div>
                <input type="button" value="Filtrar" onClick={newFilter} />
            </div>
        </form>
        <span>{listDailyParts.length} parte(s) diaria(s)</span>
    </article >
}

export default Filter