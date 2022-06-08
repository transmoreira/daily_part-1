import loading from "../../img/loading.gif"
import Image from "next/image"


export default (props)=>{
    const {hidden} = props
    console.log(hidden)
    return !hidden
        ? <div style={{
            position:"fixed",
            top:0, left:0, 
            width:"100vw",
            height:"100vh",
            zIndex:9
        }}>
            <div style={{
                width:"10vh",
                height:"10vh",
                margin:"auto",
                marginTop:"45vh",
                borderRadius:"50%"
            }}>
                <Image src={loading}/>
            </div>
        </div> 
        : <></>
}

