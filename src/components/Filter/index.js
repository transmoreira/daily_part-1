import { useState } from "react"
import { dateFormated } from "../../utils/dates"
import * as dailyPart from "../../data/dailyPart.json"
import * as clientsJSON from "../../data/clients.json"


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

const Filter = (props) => {
    const [listDailyParts, setListDailyParts] = props.state
    const [lines, setLines] = useState([])


    const clients = clientsJSON.default.map(item=>item.name)  


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
                const lines = element.value > 0 ? clientsJSON.default[element.value-1].lines.map(item=>item.name) : []
                setLines(lines)
                break;
            case "line":
                filterDatas.line = element.value
                break;
        }

    }

    const newFilter = () => {
        
        const newList = dailyPart.filter(item => {
            
            return new Date(item.date).getTime() > filterDatas.timeCourse.start.getTime() &&
                new Date(item.date).getTime() < filterDatas.timeCourse.end.getTime() &&
                (filterDatas.client == ""|| item.client == filterDatas.client) &&
                (filterDatas.line == "" || item.travels.map(item => item.line).filter(item => item == filterDatas.line).length > 0)
        })

        setListDailyParts(newList)
    }



    return <article className="filter">
        < p > Filtros</p >
        <form>
            <div>

                Período:
                <input type="date" id="start" defaultValue={dateFormated(filterDatas.timeCourse.start, false)} onChange={onChange} />
                à
                <input type="date" id="end" defaultValue={dateFormated(filterDatas.timeCourse.end, false)} onChange={onChange} />

            </div>
            <div>
                Cliente:
                <select id="client" onChange={onChange}>
                    <option value={0}></option>
                    {clients.map((item, index)=><option value={index+1}>{item}</option>)}
                </select>
                Linha:
                <input id="line" onChange={onChange}  list="list"/>
                <datalist id="list">
                    {lines.map((item, index)=><option>{item}</option>)}
                </datalist>
            </div>
            <div>
                <input type="button" value="Filtrar" onClick={newFilter} />
            </div>
        </form>

    </article >
}

export default Filter