import { dateFormated } from "../../utils/dates"

export default (props) => {

    const { id, client, date, driver, car, travels } = props.dailyPart
  
    

    return <section className="table">
        <table>
            <thead>
                <tr>
                    <th rowSpan="2" colSpan="2">
                        <img src="https://rionegronet.com.br/wp-content/uploads/2020/05/cropped-logo-rio-negro.jpg" alt="RIO NEGRO" />
                    </th>
                    <th className="no-editable" colSpan="9">PARTE DIÁRIA OPERACIONAL</th>
                </tr>
                <tr>
                    <th className="no-editable">PLACA</th>
                    <th id="plate">{car.plate}</th>
                    <th className="no-editable">Carro</th>
                    <th id="car">{car.number}</th>
                    <th className="no-editable">DATA</th>
                    <th id="date">{dateFormated(date)}</th>
                    <th className="no-editable">CLIENTE</th>
                    <th colSpan="2" id="client">{client}</th>
                </tr>
                <tr>
                    <th className="no-editable" rowSpan="2">Nº {id}</th>
                    <th className="no-editable" colSpan="7">IDENTIFIÇÃO DO MOTORISTA</th>
                    <th className="no-editable" colSpan="2">HORÀRIO DE TRABALHO</th>
                </tr>
                <tr>
                    <th className="no-editable">MATRIC</th>
                    <th id="registration">{driver.registration}</th>
                    <th className="no-editable">NOME</th>
                    <th colSpan="4" id="name">{driver.name}</th>
                    <th className="no-editable">ENT.</th>
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
                        <td >{item.line}</td>
                        <td >{item.startTime}</td>
                        <td >{item.endTime}</td>
                        <td >{item.startKM}</td>
                        <td >{item.endKM}</td>
                        <td>{item.endKM - item.startKM}</td>
                        <td >{item.amountPesenger}</td>
                        <td colSpan="2" className="min-200">{item.origin}</td>
                        <td colSpan="2" className="min-200">{item.destiny}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </section>
}