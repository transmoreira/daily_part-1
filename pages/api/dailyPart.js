import connect from "./connect"

const dailyPart = (request, response) => {

    request.setHeader("https://dahoracartaodeponto.com/","*")
    request.setHeader("Access-Control-Allow-Methods",["GET", "POST", "PUT"])
    
    if (request.method === "GET") {
        const {start, end} = request.query
        const sql = `SELECT 
                        daily_part.id AS id,
                        client, 
                        date, 
                        registration, 
                        name, 
                        number, 
                        plate, 
                        line, 
                        startTime,
                        startKM,
                        origin,
                        destiny,
                        endTime,
                        endKM,
                        direction
                     FROM daily_part
                     LEFT JOIN travels ON daily_part.id = travels.id_daily_part or travels.id_daily_part IS NULL
                     WHERE startTime >= '${start} 00:00:00' AND startTime <= '${end} 23:59:59'
                     ORDER BY travels.id_daily_part ASC, travels.startTime ASC`

        connect(sql).then(data => {

            const newData = data.reduce((acc, item, index) => {
                
                if (acc.length===0 || acc[acc.length-1].id !== item.id) {
                    acc.push({
                        id:item.id,
                         client:item.client,
                         date:item.date,
                         driver:{
                             registration:item.registration,
                             name:item.name
                         },
                         car:{
                             number:item.number,
                             plate:item.plate
                         },
                         travels:[{
                            line: item.line,
                            startTime: item.startTime,
                            startKM: item.startKM,
                            origin: item.origin,
                            destiny: item.destiny,
                            endTime: item.endTime,
                            endKM: item.endKM,
                            direction: item.direction
                        }]
                 })
                }else {
                    acc[acc.length-1].travels.push({
                        line: item.line,
                        startTime: item.startTime,
                        startKM: item.startKM,
                        origin: item.origin,
                        destiny: item.destiny,
                        endTime: item.endTime,
                        endKM: item.endKM,
                        direction: item.direction
                    })
                }

                return acc
            }, [])

            response.status(200).json(newData)
        })

    } else if (request.method === "POST") {
       
        const { client, date, driver, car } = request.body
        const sql = `INSERT INTO 
                        daily_part( 
                            client, 
                            date, 
                            registration, 
                            name, 
                            number, 
                            plate
                        ) 
                        VALUES (
                            '${client}', 
                            '${date}', 
                            ${driver.registration}, 
                            '${driver.name}', 
                            '${car.number}', 
                            '${car.plate}'
                        )`
        
        const result = connect(sql)
            .then(data => {
                const { insertId } = data
                response.status(201).json({
                    insertId
                })
            })
            .catch(error => {
                console.log(error)
                response.status(400).json({
                    error: error.message
                })
            })


    } else if (request.method === "PUT") {
        const { id, client, date, driver, car } = request.body
        const sql = `UPDATE daily_part 
                        SET client='${client}',
                            date='${date}',
                            registration=${driver.registration},
                            name='${driver.name}',
                            number='${car.number}',
                            plate='${car.plate}' 
                        WHERE id = ${id}`

        const result = connect(sql)
            .then(data => {
                const { insertId } = data
                console.log(data)
                response.status(201).json({
                    insertId
                })
            })
            .catch(error => {
                console.log(error)
                response.status(400).json({
                    error: error.message
                })
            })
    } else {
        response.status(404).json({ erro: true })
    }
}

export default dailyPart