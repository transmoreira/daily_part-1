const dateFormated = (date, brazil=true) => {
    date.setUTCHours(3)
    const day = (date.getDate()).toString().padStart(2,"0")
    const month = (date.getMonth() + 1).toString().padStart(2,"0")
    const year = date.getFullYear()    
    
    return brazil ? date.toLocaleDateString() : `${year}-${month}-${day}`
}

const timeFormated = (time, utc=0) => {
    //console.log(utc)
    
    if(utc){
        //console.log(utc)
        //time.setHours(time.getHours()+utc)
    }
    //time.setUTCHours(3)
    
    /*const options = {
      hour: 'numeric', minute: 'numeric',
      hour12: false,
      timeZone: 'America/sao_paulo'
    }*/
   
    
   /* if(hour == "NaN"|| minute == "NaN"){
        return ""
    }*/
    try{
        //return new Intl.DateTimeFormat('pt-BR',options).format(time);
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

export {dateFormated, timeFormated, filter}
