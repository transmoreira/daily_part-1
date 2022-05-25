
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
            console.log(error, sql)
            response.status(400).json(error)
        }
    }

    if (request.method === "GET") {

        const { start, end, registration, plate, company = "RN" } = request.query
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
                        passenger,
                        startTicket,
                        endTicket,
                        obs,
                        company
                     FROM daily_part
                     LEFT JOIN travels ON daily_part.id = travels.id_daily_part or travels.id_daily_part IS NULL
                     WHERE company = '${company}' AND startTime >= '${start} 00:00:00' AND
                         startTime <= '${end} 23:59:59' 
                         ${registration ? `AND registration LIKE '%${registration}%' AND plate LIKE '%${plate}%'` : ""
            }                           
                     ORDER BY travels.id_daily_part ASC, travels.startTime ASC`

        try {

            const data = await getResult(sql)
            if (data && !data.errno) {

                const newData = data.reduce((acc, item, index) => {
                    const travel = {
                        line: item.line,
                        startTime: item.startTime,
                        startKM: item.startKM,
                        origin: item.origin,
                        destiny: item.destiny,
                        endTime: item.endTime,
                        endKM: item.endKM,
                        startTicket: item.startTicket,
                        endTicket: item.endTicket,
                        direction: item.direction,
                        id: item.idTravel,
                        passenger: item.passenger
                    }
                    if (acc.length === 0 || acc[acc.length - 1].id !== item.id) {

                        acc.push({
                            id: item.id,
                            client: item.client,
                            date: item.date,
                            obs: item.obs,
                            driver: {
                                registration: item.registration,
                                name: item.name
                            },
                            car: {
                                number: item.number,
                                plate: item.plate
                            },
                            travels: [travel]
                        })
                    } else {
                        acc[acc.length - 1].travels.push(travel)
                    }

                    return acc
                }, [])

                response.status(200).json(newData)
                //response.status(200).json(data)
            } else {
                response.status(400).json({ ...data})
            }
        } catch (error) {
            response.status(400).json(error)
            return
        }

    } else if (request.method === "POST") {

        const { client, date, driver, car, company = "RN" } = JSON.parse(request.body)

        const sql = `INSERT INTO 
                        daily_part( 
                            client, 
                            date, 
                            registration, 
                            name, 
                            number, 
                            plate,
                            company
                        ) 
                        VALUES (
                            '${client}', 
                            '${date}', 
                            ${driver.registration}, 
                            '${driver.name}', 
                            '${car.number}', 
                            '${car.plate}', 
                            '${company}'
                        )`

        getResult(sql)

    } else if (request.method === "PUT") {
        const { id, obs = "", date } = JSON.parse(request.body)
        const sql = `UPDATE daily_part  
                        SET obs='${obs}',
                        date='${date}'
                    WHERE id = ${id}`

        getResult(sql)
    }
    else {
        response.status(404).json({ erro: true })
    }

}

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '8mb',
      },
    },
  }

export default dailyPart





