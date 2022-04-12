import connect from "./connect"

const dailyPart = async (request, response) => {

    const getResult = async (sql) => {
        try {            

            const data = await connect(sql)
            
            response.status(201).json(data)


        } catch (error) {
            //console.log(error)
            response.status(400).json({error:true,msg:error.message})
        }
    }

    if (request.method === "POST") {
        const { id_daily_part, line, startTime, startKM, origin, destiny, direction } = JSON.parse(request.body)
        const sql = `INSERT INTO 
                        travels( 
                            id_daily_part, 
                            line, 
                            startTime,
                            startKM,
                            origin,
                            destiny,
                            direction
                        ) 
                        VALUES (
                            '${id_daily_part}', 
                            '${line}', 
                            '${startTime}',
                            '${startKM}',
                            '${origin}',
                            '${destiny}',
                            '${direction}'
                        )`
        await getResult(sql)


    } else if (request.method === "PUT") {
        const { id, endTime, endKM, passenger } = JSON.parse(request.body)
     
        const sql = `UPDATE travels  
                        SET endTime='${endTime}',
                        endKM=${parseInt(endKM)},
                        passenger=${parseInt(passenger)}
                    WHERE id = ${id}`


        await getResult(sql)
    }

}


export default dailyPart
