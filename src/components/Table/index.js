import { dateFormated, timeFormated } from "../../utils/utils"
import logo from "../../img/logo-rio-negro.jpg"
import Image from "next/image"

export default (props) => {

    const { id, client, date, driver, car, travels, passenger } = props.dailyPart

    return <section className="table">
        <table onClick={props.onClick}>
            <thead>
                <tr>
                    <th rowSpan="2" colSpan="2">
                        <Image src={logo} alt="RIO NEGRO" />
                    </th>
                    <th className="no-editable" colSpan="9">PARTE DIÁRIA OPERACIONAL</th>
                </tr>
                <tr>
                    <th className="no-editable">PLACA</th>
                    <th id="plate">{car.plate}</th>
                    <th className="no-editable">Carro</th>
                    <th id="car">{car.number}</th>
                    <th className="no-editable">DATA</th>
                    <th id="date">{dateFormated(new Date(date))}</th>
                    <th className="no-editable">CLIENTE</th>
                    <th colSpan="2" id="client">{client}</th>
                </tr>
                <tr>
                    <th className="no-editable" rowSpan="2">Nº <span className="colorRed">{id}</span></th>
                    <th className="no-editable" colSpan="6">IDENTIFIÇÃO DO MOTORISTA</th>
                    <th className="no-editable" colSpan="3">HORÀRIO DE TRABALHO</th>
                </tr>
                <tr>
                    <th className="no-editable">MATRIC</th>
                    <th id="registration">{driver.registration}</th>
                    <th className="no-editable">NOME</th>
                    <th colSpan="3" id="name">{driver.name}</th>
                    <th colSpan="2" className="no-editable">ENT.</th>
                    <th className="no-editable">SAI.</th>
                </tr>
                <tr>
                    <th className="no-editable">ATEND.</th>
                    <th className="no-editable" colSpan="2">HORÁRIO</th>
                    <th className="no-editable" colSpan="2">KM</th>
                    <th className="no-editable" rowSpan="2">TOTAL KM</th>
                    <th className="no-editable" rowSpan="2">QTD PASSG.</th>
                    <th className="no-editable" colSpan="4">SERVIÇO EXECUTADO</th>
                </tr>
                <tr>
                    <th className="no-editable">LINHA</th>
                    <th className="no-editable">INICIAL</th>
                    <th className="no-editable">FINAL</th>
                    <th className="no-editable">INICIAL</th>
                    <th className="no-editable">FINAL</th>
                    <th className="no-editable" colSpan="2">ORIGEM</th>
                    <th className="no-editable" colSpan="2">DESTINO</th>
                </tr>
            </thead>
            <tbody>
                {travels.map((item, index) =>
                    <tr key={index}>
                        <td>{item.line}</td>
                        <td>{timeFormated(new Date(item.startTime))}</td>
                        <td>{timeFormated(new Date(item.endTime))}</td>
                        <td>{item.startKM}</td>
                        <td>{item.endKM}</td>
                        <td>{item.endKM - item.startKM}</td>
                        <td>{item.passenger}</td>
                        <td colSpan="2" className="min-200">{item.origin}</td>
                        <td colSpan="2" className="min-200">{item.destiny}</td>
                    </tr>
                )}
                <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td colSpan="2" className="min-200"></td>
                <td colSpan="2" className="min-200"></td>
                </tr>
                <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td colSpan="2" className="min-200"></td>
                <td colSpan="2" className="min-200"></td>
                </tr>
            </tbody>
        </table>
    </section>
}