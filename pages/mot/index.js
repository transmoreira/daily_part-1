import { useState } from "react"
import Modal from "../../src/components/Modal"
import fill from "../../src/components/Modal/fill"



const HomeCreateDailyPart = () => {

  const [dataModal, setDataModal] = useState({
    stateModal:"open",
    list:[], 
    info:null, 
    visibleList:true, 
    inconsistency:["0","1"]
  })
  const dailyPart = {}
  

  const handleClick = () => {
    fill(dailyPart)
  }

  return <>

    <main>
      <span className="info">TOQUE NA PARTE DIÁRIA PARA PREENCHE-LA</span>
      <table onClick={handleClick}>
        <thead>
          <tr>
            <th className="no-editable" rowSpan="2" colSpan="2"><img src="https://rionegronet.com.br/wp-content/uploads/2020/05/cropped-logo-rio-negro.jpg" alt="RIO NEGRO" /></th>
            <th className="no-editable" colSpan="9">PARTE DIÁRIA OPERACIONAL</th>
          </tr>
          <tr>
            <th className="no-editable">PLACA</th>
            <th id="plate"></th>
            <th className="no-editable">Carro</th>
            <th id="car"></th>
            <th className="no-editable">DATA</th>
            <th id="date"></th>
            <th className="no-editable">CLIENTE</th>
            <th colSpan="2" id="client"></th>
          </tr>
          <tr>
            <th className="no-editable" rowSpan="2">Nº 001301</th>
            <th className="no-editable" colSpan="7">IDENTIFIÇÃO DO MOTORISTA</th>
            <th className="no-editable" colSpan="2">HORÀRIO DE TRABALHO</th>
          </tr>
          <tr>
            <th className="no-editable">MATRIC</th>
            <th id="registration"></th>
            <th className="no-editable">NOME</th>
            <th colSpan="4" id="name"></th>
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
          <tr>
            <td data-js="line-1"></td>
            <td data-js="start-time-1"></td>
            <td data-js="end-time-1"></td>
            <td data-js="start-km-1"></td>
            <td data-js="end-km-1"></td>
            <td></td>
            <td data-js="amount-passenger-1"></td>
            <td colSpan="2" data-js="origin-1"></td>
            <td colSpan="2" data-js="destiny-1"></td>
          </tr>
          <tr>
            <td data-js="line2"></td>
            <td data-js="start-time2"></td>
            <td data-js="end-time2"></td>
            <td data-js="start-km2"></td>
            <td data-js="end-km2"></td>
            <td></td>
            <td data-js="amount-passenger2"></td>
            <td colSpan="2" data-js="origin2"></td>
            <td colSpan="2" data-js="destiny2"></td>
          </tr>
          <tr>
            <td data-js="line3"></td>
            <td data-js="start-time3"></td>
            <td data-js="end-time3"></td>
            <td data-js="start-km3"></td>
            <td data-js="end-km3"></td>
            <td></td>
            <td data-js="amount-passenger3"></td>
            <td colSpan="2" data-js="origin3"></td>
            <td colSpan="2" data-js="destiny3"></td>
          </tr>
          <tr>
            <td data-js="line4"></td>
            <td data-js="start-time4"></td>
            <td data-js="end-time4"></td>
            <td data-js="start-km4"></td>
            <td data-js="end-km4"></td>
            <td></td>
            <td data-js="amount-passenger4"></td>
            <td colSpan="2" data-js="origin4"></td>
            <td colSpan="2" data-js="destiny4"></td>
          </tr>
          <tr>
            <td data-js="line5"></td>
            <td data-js="start-time5"></td>
            <td data-js="end-time5"></td>
            <td data-js="start-km5"></td>
            <td data-js="end-km5"></td>
            <td></td>
            <td data-js="amount-passenger5"></td>
            <td colSpan="2" data-js="origin5"></td>
            <td colSpan="2" data-js="destiny5"></td>
          </tr>
          <tr>
            <td data-js="line6"></td>
            <td data-js="start-time6"></td>
            <td data-js="end-time6"></td>
            <td data-js="start-km6"></td>
            <td data-js="end-km6"></td>
            <td></td>
            <td data-js="amount-passenger6"></td>
            <td colSpan="2" data-js="origin6"></td>
            <td colSpan="2" data-js="destiny6"></td>
          </tr>
          <tr>
            <td data-js="line7"></td>
            <td data-js="start-time7"></td>
            <td data-js="end-time7"></td>
            <td data-js="start-km7"></td>
            <td data-js="end-km7"></td>
            <td></td>
            <td data-js="amount-passenger7"></td>
            <td colSpan="2" data-js="origin7"></td>
            <td colSpan="2" data-js="destiny7"></td>
          </tr>
          <tr>
            <td data-js="line8"></td>
            <td data-js="start-time8"></td>
            <td data-js="end-time8"></td>
            <td data-js="start-km8"></td>
            <td data-js="end-km8"></td>
            <td></td>
            <td data-js="amount-passenger8"></td>
            <td colSpan="2" data-js="origin8"></td>
            <td colSpan="2" data-js="destiny8"></td>
          </tr>
          <tr>
            <td data-js="line9"></td>
            <td data-js="start-time9"></td>
            <td data-js="end-time9"></td>
            <td data-js="start-km9"></td>
            <td data-js="end-km9"></td>
            <td></td>
            <td data-js="amount-passenger9"></td>
            <td colSpan="2" data-js="origin9"></td>
            <td colSpan="2" data-js="destiny9"></td>
          </tr>
          <tr>
            <td data-js="line-10"></td>
            <td data-js="start-time-10"></td>
            <td data-js="end-time-10"></td>
            <td data-js="start-km-10"></td>
            <td data-js="end-km-10"></td>
            <td></td>
            <td data-js="amount-passenger-10"></td>
            <td colSpan="2" data-js="origin-10"></td>
            <td colSpan="2" data-js="destiny-10"></td>
          </tr>
        </tbody>
      </table>
      <Modal setDataModal={setDataModal} dataModal={dataModal}/>
    </main>
  </>
}

export default HomeCreateDailyPart