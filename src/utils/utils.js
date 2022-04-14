const dateFormated = (date, brazil=true) => {
    date.setUTCHours(3)
    const day = (date.getDate()).toString().padStart(2,"0")
    const month = (date.getMonth() + 1).toString().padStart(2,"0")
    const year = date.getFullYear()    
    
    return brazil ? date.toLocaleDateString() : `${year}-${month}-${day}`
}

const timeFormated = (time, utc=0) => {
    //console.log(utc)
    //time.setHours(time.getHours()+utc)
    //time.setUTCHours(3)
    
    const options = {
          hour: 'numeric',
          minute: 'numeric'
        }
   
    
   /* if(hour == "NaN"|| minute == "NaN"){
        return ""
    }*/

    return new Intl.DateTimeFormat('pt-BR',options).format(time));
}

const filter = (dailyPart, filterDatas) =>  dailyPart.filter((item, index) => {
        
        return new Date(item.date).getTime() > filterDatas.timeCourse.start.getTime() &&
            new Date(item.date).getTime() < filterDatas.timeCourse.end.getTime() &&
            (filterDatas.client == ""|| item.client == filterDatas.client) &&
            (filterDatas.line == "" || item.travels.map(item => item.line).filter(item => item == filterDatas.line).length > 0)
    })

export {dateFormated, timeFormated, filter}
