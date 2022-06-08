import loading from "../../img/loading.gif"
import Image from "next/image"


export default (props)=>{
    const {hidden} = props
 
    
    
    return !hidden
        ? <div style={{
            position:"fixed",
            top:0, 
            left:0, 
            width:"100%",
            height:"100%",
            backgroundColor:"rgb(255 255 255 / 80%)",
            zIndex:9999
        }}>
            <div style={{
                width:"10vh",
                height:"10vh",
                margin:"40vh auto",
                borderRadius:"50%",
                color:"#59a3d7",
                fontWeight:"bold",
                fontSize:25
            }}>
                <Image src={loading}/>
                <label style={{
                    backgroundColor:"white"
                }}>Aguarde...</label>                
            </div>
        </div> 
        : <></>
}

