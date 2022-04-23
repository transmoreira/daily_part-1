const dateFormated = (date, brazil=true) => {
    date.setUTCHours(3)
    const day = (date.getDate()).toString().padStart(2,"0")
    const month = (date.getMonth() + 1).toString().padStart(2,"0")
    const year = date.getFullYear()    
    
    return brazil ? date.toLocaleDateString() : `${year}-${month}-${day}`
}

const timeFormated = (time, ) => {
    
    try{
        const timeString = time.toString().substr(11,5)
        return timeString != "00:00" ? timeString : ""
    }catch(erro){
        return ""
    }
}

const filter = (dailyPart, filterDatas) =>  dailyPart.filter((item, index) => {
        
        return new Date(item.date).getTime() > filterDatas.timeCourse.start.getTime() &&
            new Date(item.date).getTime() < filterDatas.timeCourse.end.getTime() &&
            (filterDatas.client == ""|| item.client == filterDatas.client) &&
            (filterDatas.line == "" || item.travels.map(item => item.line).filter(item => item == filterDatas.line).length > 0)
    })

const unproductiveKm = ()=>({
    name:"DESLOCAMENTO OCIOSO",
    direction:[
        "INICIO DE ROTA",
        "FIM DE ROTA",
        "CASA",
        'GARAGEM'
    ]
})

export {dateFormated, timeFormated, filter, unproductiveKm}

