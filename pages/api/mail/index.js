

import nodemailer from "nodemailer"

const SendMail = async (request, response) => {

    if (request.method == "POST") {

        const list = JSON.parse(request.body)

        const mailFrom = "divanirsilva@rionegronet.com.br"
        const mailListTo = [
            "andreabelario@transmoreira.com.br",
                "trafegorodoviario@rionegronet.com.br",
                "brunorangel@rionegronet.com.br",
                "itabirito@rionegronet.com.br",
                "fabiocastro@rionegronet.com.br",
                "saogoncalo@rionegronet.com.br",
                "jennerleandro@transmoreira.com.br",
                "sarzedo@rionegronet.com.br",
                "juniorrocha@rionegronet.com.br",
                "controlevale@transmoreira.com.br",
                "novalima@rionegronet.com.br",
                "brumadinho@rionegronet.com.br",
                "marcoscamargos@transmoreira.com.br",
                "igarape@rionegronet.com.br",
                "reginaldoelias@rionegronet.com.br",
                "roniemiliano@transmoreira.com.br"
            ]

            

        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: mailFrom,
                pass: "Vtm@1232"
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        /*console.log(transporter)*/

        try {


            const rest = await transporter.sendMail({
                from: `Parte Diaria Digtal <${mailFrom}>`,
                to: mailListTo,
                subject: "Partes diarias não preenchidas",
                //text: ""
                html: `<p>
            Segue a lista de partes diarias <strong>não preenchida:</strong></br></br></br>
            <table border="1">
                <thead>
                    <tr>
                        <th>CLIENTE</th>
                        <th>LINHA</th>
                    </tr>
                </thead>
                ${list.map(item => `<tr>${item}</tr>`).join("")}
            </table>
            
        </p>`
            })
            
            response.send({ success: true, rest })
        } catch (error) {
            response.send({ success: false, error })
        }
    }else{
        response.send({ success: false })
    }

}

export default SendMail
