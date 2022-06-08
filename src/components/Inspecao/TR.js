export default (props)=>{
    const {item, number, endMonth} = props
    
    let partTR = []
    for(let i = 1; i<=endMonth;i++){
        partTR.push(<td key={i+"empty"}></td>)
    }
   
    return item.text 
        ? <tr><td colSpan={35} style={{paddingLeft:250, paddingRight:250, backgroundColor:"#80808082"}}>{item.text}</td></tr> 
        : <tr><td style={{width:20}}>{number}</td><td style={{minWidth:200}} colSpan={4}>{item.item}</td>{partTR}</tr>
}