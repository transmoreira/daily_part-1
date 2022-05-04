import { dateFormated, timeFormated } from "../../utils/utils"
import { AiTwotoneDelete, AiFillDelete } from "react-icons/ai"
import logoRN from "../../img/logo-rio-negro.jpg"
import logoTM from "../../img/transmoreira.png"
import Image from "next/image"

export default (props) => {

    const { id, client, date, driver, car, travels, passenger, obs } = props.dailyPart
    const { unproductive, productive } = props.kms || { unproductive: -1, productive: -1 }
    const company = props.company || "RN"
    const isUrban = company == "TM"
    const logo = (isUrban || client == "PETROBRÁS") ? logoTM : logoRN
    const edit = props.edit || false

    return <section className="table">
        {unproductive >= 0 && <>
            <span className="success "> {productive} KM PRODUTIVO</span>
            <span className="error no-print"> {unproductive} KM IMPRODUTIVO</span>
        </>}
        <table onClick={props.onClick}>
            <thead>
                <tr>
                    <th rowSpan="2" colSpan="2">
                        <Image src={logo} alt="RIO NEGRO" />
                    </th>
                    {isUrban
                        ? <th className="no-editable" colSpan="10">DIÁRIO DE BORDO</th>
                        : <th className="no-editable" colSpan="8">PARTE DIÁRIA OPERACIONAL</th>
                    }

                    <th id="date">{dateFormated(new Date(date))}</th>
                </tr>
                <tr>
                    <th className="no-editable">PLACA</th>
                    <th id="plate">{car.plate}</th>
                    <th className="no-editable" colSpan={company === "TM" ? 2 : 1}>Carro</th>
                    <th id="car">{car.number}</th>
                    {isUrban
                        ? <th className="no-editable" colSpan={6}></th>
                        : <>
                            <th className="no-editable" colSpan={3}>CLIENTE</th>
                            <th colSpan="2" id="client">{client}</th>
                        </>
                    }
                </tr>
                <tr>
                    <th className="no-editable" rowSpan="2" colSpan={2}>Nº <span className="colorRed">{id}</span></th>
                    <th className="no-editable" colSpan={isUrban ? 11 : 9}>IDENTIFIÇÃO DO MOTORISTA</th>
                </tr>
                <tr>
                    <th className="no-editable" colSpan={2}>MATRÍCULA</th>
                    <th id="registration">{driver.registration}</th>
                    <th className="no-editable" colSpan={2}>NOME</th>
                    {isUrban
                        ? <th colSpan={6} id="name" >{driver.name}</th>
                        : <th colSpan={4} id="name" >{driver.name}</th>
                    }
                </tr>
                <tr>
                    <th className="no-editable">ATEND.</th>
                    <th className="no-editable" colSpan="2">HORÁRIO</th>
                    <th className="no-editable" colSpan="2">KM</th>
                    <th className="no-editable" rowSpan="2">TOTAL KM</th>
                    {isUrban
                        && <th className="no-editable" colSpan="2">ROLETA</th>
                    }
                    <th className="no-editable" rowSpan="2">QTD PASSG.</th>
                    <th className="no-editable" colSpan="4">SERVIÇO EXECUTADO</th>
                </tr>
                <tr>
                    <th className="no-editable">LINHA</th>
                    <th className="no-editable">INICIAL</th>
                    <th className="no-editable">FINAL</th>
                    <th className="no-editable">INICIAL</th>
                    <th className="no-editable">FINAL</th>
                    {isUrban
                        && <>
                            <th className="no-editable">INICIAL</th>
                            <th className="no-editable">FINAL</th>
                        </>
                    }
                    <th className="no-editable" colSpan="2">ORIGEM</th>
                    <th className="no-editable" colSpan="2">DESTINO</th>
                </tr>
            </thead>
            <tbody>
                {travels.map((item, index, array) =>
                    <tr key={index}>
                        <td>{item.line}</td>
                        <td>{timeFormated(item.startTime)}</td>
                        <td>{timeFormated(item.endTime)}</td>
                        <td>{item.startKM}</td>
                        <td>{item.endKM}</td>
                        <td>{item.endKM - item.startKM}</td>
                        {isUrban &&
                            <>
                                <th>{item.startTicket}</th>
                                <th>{item.endTicket}</th>
                            </>
                        }
                        <td>{item.passenger}</td>
                        <td colSpan="2" className="min-100">{item.origin}</td>
                        <td colSpan="2" className="min-100">{item.destiny}</td>
                        {edit &&
                            <td className="delete" data-js={item.id}>
                                <AiFillDelete data-js={item.id} className="delete" color="red" size="25px" />
                            </td>
                        }
                    </tr>
                )}
                <tr key={100}>
                    <td className="min-100"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {isUrban &&
                        <>
                            <th></th>
                            <th></th>
                        </>
                    }
                    <td colSpan="2" className="min-100"></td>
                    <td colSpan="2" className="min-100"></td>
                </tr>
                <tr key={101}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    {isUrban &&
                        <>
                            <th></th>
                            <th></th>
                        </>
                    }
                    <td colSpan="2" className="min-100"></td>
                    <td colSpan="2" className="min-100"></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>

                    <td colSpan={isUrban ? 13 : 11}>
                        {obs}
                    </td>
                </tr>
            </tfoot>
        </table>
    </section>
}
