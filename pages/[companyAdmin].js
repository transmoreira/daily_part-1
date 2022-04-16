import Home from "."
import CreateDailyPart from "./createDailyPart"

const { useRouter } = require("next/router")

const company = ()=>{
    const router = useRouter()
    const param = router.query.companyAdmin
    if(!param){
        return <></>
    }
    const parans = param.split("_")
    
    const company =  parans[0]  
    const admin = parans[1] == "admin"
    console.log(company, admin)
    return <>
        { admin 
            ? <Home company={company}/>
            : <CreateDailyPart company={company}/>
        }
    </>
}

export default company