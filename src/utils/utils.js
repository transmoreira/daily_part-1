const dateFormated = (date, brazil=true) => {
    
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    

    return brazil ?
     `${day <= 9 ? "0" + day : day}/${month <= 9 ? "0" + month : month}/${year}` :
     `${year}-${month <= 9 ? "0" + month : month}-${day <= 9 ? "0" + day : day}`
}

const timeFormated = (time) => {
    
    const hour = time.getHours()
    const minute = time.getMinutes()
    //console.log(time)
    if(!hour|| !minute){
        return ""
    }

    return `${hour <= 9 ? "0" + hour : hour}:${minute <= 9 ? "0" + minute : minute}`
}

const filter = (dailyPart, filterDatas) =>  dailyPart.filter((item, index) => {
        
        return new Date(item.date).getTime() > filterDatas.timeCourse.start.getTime() &&
            new Date(item.date).getTime() < filterDatas.timeCourse.end.getTime() &&
            (filterDatas.client == ""|| item.client == filterDatas.client) &&
            (filterDatas.line == "" || item.travels.map(item => item.line).filter(item => item == filterDatas.line).length > 0)
    })

export {dateFormated, timeFormated, filter}