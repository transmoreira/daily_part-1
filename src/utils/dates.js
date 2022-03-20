const dateFormated = (date, brazil=true) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return brazil ?
     `${day <= 9 ? "0" + day : day}/${month <= 9 ? "0" + month : month}/${year}` :
     `${year}-${month <= 9 ? "0" + month : month}-${day <= 9 ? "0" + day : day}`
}

export {dateFormated}