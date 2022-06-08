import logoVale from "../../img/logo-vale.jpg"
import logoRN from "../../img/logo-rio-negro.jpg"
import Image from "next/image"
import TR from "./TR"

const Inspecao = (props) => {
    const { header, body } = props
    console.log(header.endMonth)
    let partTR = []
    for(let i = 1; i<=header.endMonth;i++){
        partTR.push(<td>{i}</td>)
    }
    return (
        <table style={{margin:"auto", fontSize: 12}}>
            <thead>
                <tr>
                    <th colSpan={5} style={{minWidth:150}}><Image src={logoVale} alt="VALE" /></th>
                    <th colSpan={23}>INSPEÇÃO PRÉ-USO DE ÔNIBUS</th>
                    <th colSpan={10}><Image src={logoRN} alt="RIO NEGRO" /></th>
                </tr>
                <tr style={{ fontSize: 12 }}>
                    <th colSpan={5}>MARCA/MODELO:<p>{header.car.model}</p></th>
                    <th colSpan={8}>ANO DE FABRICAÇÃO:<p>{header.car.year}</p></th>
                    <th colSpan={7}>TAG:<p>{header.car.number}</p></th>
                    <th colSpan={8}>PLACA:<p>{header.car.plate}</p></th>
                    <th colSpan={10}>CAPACIDADE MAXIMA DE CARGA<p>{header.car.capacity}</p></th>
                </tr>
                <tr style={{ fontSize: 12 }}>
                    <th colSpan={5}>TIPO DE VEÍCULO:<p>{header.car.type}</p></th>
                    <th colSpan={8}>UNIDADE/MINA:<p>{header.unidade}</p></th>
                    <th colSpan={10}>GERENCIA EMPRESA:<p>{header.company}</p></th>
                    <th colSpan={5}>MÊS:<p>{header.month}</p></th>
                    <th colSpan={10}>LEGENDA DE REGISTRO<p><br />S = SIM N = NÃO</p><p>NA = NÃO APLICÁVEL</p></th>
                </tr>
                <tr style={{ fontSize: 12 }}>
                    <th colSpan={5} rowSpan={2}>RELAÇÃO DE ITEMS DE VERIFICAÇÃO<br />(INSPEÇÃO VISUAL)</th>
                    <th colSpan={31}>INSPEÇÃO PRÉ-USO(dias do mês)</th>
                </tr>
                <tr>
                    {partTR}
                </tr>
            </thead>
            <tbody>
                {body.map((item,index)=><TR item={item} number={index} endMonth={header.endMonth}/>)}
            </tbody>            
            <tfoot>
                
                <TR item={{text:"RESULTADO DA INSPEÇÃO"}} number={null} endMonth={header.endMonth}/>
                <TR item={{item:"VEICULO LIBERADO AO TRABALHO."}} number={null} endMonth={header.endMonth}/>                 
                <TR item={{item:"NÃO LIBERADO AO TRABALHO \nSOLICITAR MANUTENÇÃO"}} number={null} endMonth={header.endMonth}/>                 
            </tfoot>
        </table>)
}


export default Inspecao