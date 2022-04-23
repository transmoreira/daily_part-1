
import fs from "fs"

const employee = (request, response) => {

    if (request.method === "DELETE") {
        const { index } = JSON.parse(request.body)
        
        try {

            const data = JSON.parse(fs.readFileSync("./src/data/cars.json", err => {
                if(err){
                    response.status(400).send(err)
                    return
                }
            }))
            
            data.splice(index, 1)

            const result = fs.writeFileSync("./src/data/cars.json", JSON.stringify(data), err => {
                response.status(400).send(err)
            })
            console.log(data)
            response.send({success:true})
            

        } catch (error) {
            response.status(400).send(error)
        }
    }
}

export default employee