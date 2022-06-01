import { useState, useRef } from "react"
import ReactDom from "react-dom"
import cars from "../../data/cars.json"
const Abastecimento = (props)=>{
    

    const data = {}//, setData] = useState(props)
    const spanMessage = useRef(null)
    const main = useRef(null)
    const bt = useRef(null)
    const inputDate = useRef(null)
    const inputCar = useRef(null)
    const inputOdometer = useRef(null)
    const inputLiterage = useRef(null)
    const inputBomba = useRef(null)

    const [sheet, setSheet] = useState([])
   
    const backgroundColor = (!data.CARRO || !data.DATA || !data.LITRAGEM || !data.ODOMETRO)
        ? "gray"    
        : "blue"          
    
    
    
    const sendData = async (event)=>{       
        event.preventDefault()      
        


        data.CARRO = inputCar.current.value
        data.ODOMETRO = inputOdometer.current.value
        data.LITRAGEM = inputLiterage.current.value
        data.BOMBA = inputBomba.current.value
               
        
        if(!data.CARRO || !inputDate.current.value || !data.LITRAGEM || !data.ODOMETRO){
            return
        }

        const [year, month, day] = inputDate.current.value.split("-")
       
        data.DATA = `${day}/${month}/${year}`
        const body = JSON.stringify({...data})
        const request = await fetch("/api/excel",{
            method:"POST",
            body
        })
        const response = await request.json()
        
        showMessage(spanMessage.current, response.message,response.success)       
        
        if(response.success){
            inputCar.current.value = ""
            inputDate.current.value = ""
            inputOdometer.current.value = ""
            inputLiterage.current.value = ""
            inputBomba.current.value = ""
            setSheet(response.sheet)
            if(props.CARRO){               
                document.querySelector("form").parentNode.remove()
            }
        }   

    }
    
    const close = ()=>{
        document.querySelector("form").parentNode.remove()
    }

    return (
        <main ref={main} style={styleMain}>
                <form style={styleForm}>
                    DIGITE O ABASTECIMENTO<br/><br/>
                    <label style={styleLabel} htmlFor="date">DATA</label>
                    <Input
                        refer={inputDate}
                        id="date"
                        type="date"
                        value={props.DATA}/>
                    <label style={styleLabel} htmlFor="car">CARRO</label>
                    <Input 
                        refer={inputCar}
                        id="car" 
                        list="cars"
                        value={props.CARRO}/>
                    <datalist id="cars">
                        {cars.map(car=>
                            <option key={car.number}>{car.number}</option>
                        )}
                    </datalist>
                    <label style={styleLabel} htmlFor="odomenter">ODOMETRO</label>
                    <Input 
                        refer={inputOdometer}
                        id="odomenter"  
                        value={props.ODOMETRO}  
                        type="number"/>
                    <label style={styleLabel} htmlFor="literage">LITRAGEM</label>
                    <Input refer={inputLiterage} id="literage"  type="number"/>
                    <label style={styleLabel} htmlFor="bomba">BOMBA</label>
                    <Input refer={inputBomba} id="bomba"/>
                    <span style={styleSpanMessage} ref={spanMessage}></span>
                    <button 
                        ref={bt} 
                        type="submit" 
                        onClick={sendData}>Enviar</button>
                    {props.CARRO &&
                        <button 
                            style={notFuelAdded}
                            onClick={close}>
                                CARRO NÃO FOI ABASTECIDO OU JA INFORMOU ABASTECIMENTO CLICA AQUI
                            </button>
                    }
                </form>
                {!props.CARRO &&
                    <div style={styleTable}>
                        <table style={{width:"100%"}}>
                            <thead>
                                <th>DATA</th>
                                <th>CARRO</th>
                                <th>ODOMETRO</th>
                                <th>LITRAGEM</th>
                                <th>BOMBA</th>
                            </thead>
                            <tbody>
                                {sheet.map(item=><tr>
                                        <td>{item.DATA}</td>
                                        <td>{item.CARRO}</td>
                                        <td>{item.ODOMETRO}</td>
                                        <td>{item.LITRAGEM}</td>
                                        <td>{item.BOMBA}</td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                }
            </main>
    )
}

const showMessage = (spanMessage, message, success)=>{
    spanMessage.innerText = message
    spanMessage.className = success? "success" : "error"

    setTimeout(() => {
        spanMessage.innerText = ""
        spanMessage.className = ""
    }, 2500);
}

const Input = ({type, id, onChange, list, value, refer})=>{
  
    return <input 
        ref={refer}
        id={id} 
        type={type} 
        list={list}
        style={styleInput}
        defaultValue={value}
        />
}

const styleMain = {
    backgroundColor:"#505050e6",
    width:"100%",
    height:"100%",
    position: "fixed",
    zIndex: 1001,
    top: 0  
}

const styleForm = {
    border:"black 1px solid",
    padding:15,
    backgroundColor:"white",
    paddingRight:15,
    width:300,
    margin: "50px auto",
    position:"fixed",
    top:0,
    left:"40%"
}

const styleLabel = {
    display:"flex",
    padding:5,
    borderTop:"black solid 2px",
    borderLeft:"black solid 2px",
    borderRight:"black solid 2px",
    textAlign:"center",
    width:"95%"
}

const styleInput = {
    display:"flex",
    padding:5,
    marginBottom:5,
    borderTop:"none",
    textAlign:"center"
}

const styleSpanMessage = {
    padding:5,
    borderRadius:5

}

const notFuelAdded = {
    backgroundColor:"transparent",
    color:"rgb(255, 50, 50)"
}

const styleTable = {
    backgroundColor:"white",
    width:500,
    height:"100vh",
    overflowX:"auto"
}

export default Abastecimento