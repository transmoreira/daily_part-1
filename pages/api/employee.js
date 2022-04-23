
import fs from "fs"

const employee = (request, response) => {

    if (request.method === "DELETE") {
        const { index } = JSON.parse(request.body)
        try {

            const data = JSON.parse(fs.readFileSync("./src/data/employees.json", err => {
                if(err){
                    response.status(400).send(err)
                    return
                }
            }))
            
            data.splice(index, 1)

            const result = fs.writeFileSync("./src/data/employees.json", JSON.stringify(data), err => {
                response.status(400).send(err)
            })

            response.send({success:true})
            

        } catch (error) {
            response.status(400).send(error)
        }
    }
}

export default employee