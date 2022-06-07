import logoVale from "../../img/logo-vale.jpg"
import logoRN from "../../img/logo-rio-negro.jpg"
import Image from "next/image"
import TR from "./TR"

const Inspecao = (props) => {
    const { header, body } = props
    return (
        <table style={{margin:"auto"}}>
            <thead>
                <tr>
                    <th colSpan={4} style={{minWidth:150}}><Image src={logoVale} alt="VALE" /></th>
                    <th colSpan={23}>INSPEÇÃO PRÉ-USO DE ÔNIBUS</th>
                    <th colSpan={10}><Image src={logoRN} alt="RIO NEGRO" /></th>
                </tr>
                <tr style={{ fontSize: 12 }}>
                    <th colSpan={4}>MARCA/MODELO:<p>{header.car.model}</p></th>
                    <th colSpan={8}>ANO DE FABRICAÇÃO:<p>{header.car.year}</p></th>
                    <th colSpan={7}>TAG:<p>{header.car.number}</p></th>
                    <th colSpan={8}>PLACA:<p>{header.car.plate}</p></th>
                    <th colSpan={10}>CAPACIDADE MAXIMA DE CARGA<p>{header.car.capacity}</p></th>
                </tr>
                <tr style={{ fontSize: 12 }}>
                    <th colSpan={4}>TIPO DE VEÍCULO:<p>{header.car.type}</p></th>
                    <th colSpan={8}>UNIDADE /MINA:<p>{header.unidade}</p></th>
                    <th colSpan={10}>GERENCIA EMPRESA:<p>{header.company}</p></th>
                    <th colSpan={5}>MÊS:<p>{header.month}</p></th>
                    <th colSpan={10}>LEGENDA DE REGISTRO<p><br />S = SIM N = NÃO</p><p>NA = NÃO APLICÁVEL</p></th>
                </tr>
                <tr style={{ fontSize: 12 }}>
                    <th colSpan={4} rowSpan={2}>RELAÇÃO DE ITEMS DE VERIFICAÇÃO<br />(INSPEÇÃO VISUAL)</th>
                    <th colSpan={31}>INSPEÇÃO PRÉ-USO(dias do mês)</th>
                </tr>
                <tr>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                    <th>11</th>
                    <th>12</th>
                    <th>13</th>
                    <th>14</th>
                    <th>15</th>
                    <th>16</th>
                    <th>17</th>
                    <th>18</th>
                    <th>19</th>
                    <th>20</th>
                    <th>21</th>
                    <th>22</th>
                    <th>23</th>
                    <th>24</th>
                    <th>25</th>
                    <th>26</th>
                    <th>27</th>
                    <th>28</th>
                    <th>29</th>
                    <th>30</th>
                    <th>31</th>
                </tr>
            </thead>
            <tbody>
                {body.map((item,index)=><TR item={item} number={index}/>)}
            </tbody>
        </table>)
}


export default Inspecao