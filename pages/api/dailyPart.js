
import connect from "./connect"


const dailyPart = async (request, response) => {

    

    const getResult = async (sql) => {
        try {
            const data = await connect(sql)
            console.log(data)
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

    if (request.method === "GET") {
        console.log("###################################################################")
        const { start, end, registration, plate } = request.query
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
                        direction,
                        travels.id AS idTravel,
                        passenger
                     FROM daily_part
                     LEFT JOIN travels ON daily_part.id = travels.id_daily_part or travels.id_daily_part IS NULL
                     WHERE startTime >= '${start} 00:00:00' AND
                         startTime <= '${end} 23:59:59' 
                         ${
                            registration? `AND registration LIKE '%${registration}%' AND plate LIKE '%${plate}%'` : ""
                         }                           
                     ORDER BY travels.id_daily_part ASC, travels.startTime ASC`
                         
        const data = await getResult(sql)
       console.log(data)
        if (data && !data.errno) {

            const newData = data.reduce((acc, item, index) => {
                if (acc.length === 0 || acc[acc.length - 1].id !== item.id) {
                    console.log(item)   
                    acc.push({
                        id: item.id,
                        client: item.client,
                        date: item.date,
                        driver: {
                            registration: item.registration,
                            name: item.name
                        },
                        car: {
                            number: item.number,
                            plate: item.plate
                        },
                        travels: [{
                            line: item.line,
                            startTime: item.startTime,
                            startKM: item.startKM,
                            origin: item.origin,
                            destiny: item.destiny,
                            endTime: item.endTime,
                            endKM: item.endKM,
                            direction: item.direction,
                            id:item.idTravel,
                            passenger:item.passenger
                        }]
                    })
                } else {
                    acc[acc.length - 1].travels.push({
                        line: item.line,
                        startTime: item.startTime,
                        startKM: item.startKM,
                        origin: item.origin,
                        destiny: item.destiny,
                        endTime: item.endTime,
                        endKM: item.endKM,
                        direction: item.direction,
                        id:item.idTravel,
                        passenger:item.passenger
                    })
                }

                return acc
            }, [])

            response.status(200).json(newData)
        } else {

            response.status(400).json({...data,sql:""})
        }
    } else if (request.method === "POST") {

        const { client, date, driver, car } = JSON.parse(request.body)

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

        getResult(sql)

    } else {
        response.status(404).json({ erro: true })
    }
    
}



export default dailyPart





