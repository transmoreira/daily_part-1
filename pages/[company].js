import CreateDailyPart from "./createDailyPart"

const { useRouter } = require("next/router")

const company = ()=>{
    const router = useRouter()
    const company = router.query.company
    return <>
        <CreateDailyPart company={company}/>
    </>
}

export default company