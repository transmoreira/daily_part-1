

import nodemailer from "nodemailer"

const SendMail = async (request, response) => {

    if (request.method == "POST") {

        const list = JSON.parse(request.body)

        const mailFrom = "atendimento@alocafacil.com.br"
        const mailListTo = ["divanirjs@gmail.com", "divanirsilva@rionegronet.com.br"]

        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: mailFrom,
                pass: "#Di18651262"
            },
            tls: {
                rejectUnauthorized: false
            }
        })



        try {


            const rest = await transporter.sendMail({
                from: `Parte Diaria Digtal <${mailFrom}>`,
                to: mailListTo,
                subject: "Partes diarias não preenchidas",
                //text: ""
                html: `<p>
            Segue a lista de partes diarias <strong>não preenchida:</strong></br></br></br>
            <ol>
                ${list.map(item => `<li>${item}</li>`)}
            </ol></br>
            <small>Não responder este email. Email enviado automaticamente</small>
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
