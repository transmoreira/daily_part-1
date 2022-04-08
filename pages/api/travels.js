import connect from "./connect"

const dailyPart = async (request, response) => {

    const getResult = async (sql) => {
        try {
            const data = await connect(sql)
            if (request.method === "GET") {
                return data
            } else {
                const { insertId } = data
                response.status(201).json({
                    insertId
                })
            }

        } catch (error) {
            console.log(error)
            response.status(400).json({...error,sql:""})
        }
    }

    if (request.method === "POST") {
        const { id_daily_part, line, startTime, startKM, origin, destiny, endTime, endKM, direction } = JSON.parse(request.body)
        const sql = `INSERT INTO 
                        travels( 
                            id_daily_part, 
                            line, 
                            startTime,
                            startKM,
                            origin,
                            destiny,
                            endTime,
                            endKM,
                            direction
                        ) 
                        VALUES (
                            '${id_daily_part}', 
                            '${line}', 
                            '${startTime}',
                            '${startKM}',
                            '${origin}',
                            '${destiny}',
                            '${endTime}',
                            '${endKM}',
                            '${direction}'
                        )`
        getResult(sql)


    } else if (request.method === "PUT") {
        const { id, endTime, endKM, passenger } = JSON.parse(request.body)
        const sql = `UPDATE travels  
                        SET endTime='${endTime}',
                        endKM=${endKM},
                        passenger=${passenger}
                    WHERE id = ${id}`

        getResult(sql)
    }

}


export default dailyPart