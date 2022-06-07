export default (props)=>{
    const {item, number} = props
    
    let partTR = []
    for(let i = 1; i<=28;i++){
        partTR.push(<td></td>)
    }
   
    return item.text 
        ? <tr><td colSpan={35} style={{paddingLeft:250, paddingRight:250, backgroundColor:"#80808082"}}>{item.text}</td></tr> 
        : <tr><td>{number}</td><td style={{minWidth:200}} colSpan={3}>{item.item}</td>{partTR}</tr>
}