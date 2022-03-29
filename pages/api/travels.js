import connect from "./connect"

const dailyPart = (request, response) => {
    
    if (request.method === "GET") {

        const sql = `SELECT client, date, registration, name, number, plate
                        FROM travels
                        INNER JOIN daily_part ON daily_part.id = travels.id_daily_part`
        connect(sql).then(data=>{
            
          
            
            response.status(200).json(data)
        })

    } else if (request.method === "POST") {
        const {id_daily_part, line, startTime, startKM, origin, destiny, endTime, endKM, direction} = request.body
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
        const result = connect(sql)
        .then(data=>{
            const {insertId} = data
            response.status(201).json({
                insertId
            })
        })
        .catch(error=>{
            console.log(error)
            response.status(400).json({
                error:error.message
            })
        })
        
        
    } else if (request.method === "PUT") {
        const {id, id_daily_part, line, startTime, startKM, origin, destiny, endTime, endKM, direction} = request.body
        const sql = `UPDATE travels 
                        SET id_daily_part=${id_daily_part}, 
                        line='${line}', 
                        startTime='${startTime}',
                        startKM=${startKM},
                        origin='${origin}',
                        destiny='${destiny}',
                        endTime='${endTime}',
                        endKM=${endKM},
                        direction=${direction}
                    WHERE id = ${id}`

                    console.log(sql)

        const result = connect(sql)
        .then(data=>{
            const {insertId} = data
            console.log(data)
            response.status(201).json({
                insertId
            })
        })
        .catch(error=>{
            console.log(error)
            response.status(400).json({
                error:error.message
            })
        })
    } else {
        response.status(404).json({ erro: true })
    }
}

export default dailyPart