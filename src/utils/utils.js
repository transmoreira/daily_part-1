

const dateFormated = (date, brazil=true) => {
    date.setUTCHours(3)
    const day = (date.getDate()).toString().padStart(2,"0")
    const month = (date.getMonth() + 1).toString().padStart(2,"0")
    const year = date.getFullYear()    
    
    return brazil ? `${day}/${month}/${year}` : `${year}-${month}-${day}`
}

const timeFormated = (time) => {
   
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

const exportCsv = (dailyParts)=>{
    const contentCSV =
        dailyParts.reduce((acc,dailyPart)=>{
            dailyPart.travels.forEach(travel=>{
                acc.push([travel.line,travel.origin,travel.destiny,travel.startTime,travel.endTime,travel.startKM,travel.endKM,travel.endKM-travel.startKM,dailyPart.car.number,dailyPart.driver.name])
            })
            return acc
        },[])
    
    return contentCSV
}

export {dateFormated, timeFormated, filter, exportCsv}
