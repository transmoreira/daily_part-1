import { useState } from "react"



const Modal = (props) => {

  const {stateModal, list, info, visibleList, inconsistency} = props.dataModal
  const setStateModal = props.setDataModal
 console.log(inconsistency)
  function onKeyUp(event){}
  function onClick(event){
    const newDataModal = {...props.dataModal}
    newDataModal.stateModal = "close"
    setStateModal(newDataModal)
  }

  return <div className={`modal ${stateModal}`}>
    <div className="content-modal">
      <span className="close" onClick={()=>{onclick}}>x</span>
      <label>{info}</label>
      <input type="text" data-js="data" placeholder="Toque aqui para digitar" list="list" onKeyUp={onKeyUp}/>
      <datalist id="list">
        {visibleList ? list.map(item => <option>{item}</option>):""}
      </datalist>
      <span className={`inconsistency ${inconsistency[1]}`}>{inconsistency[0]}</span>
      <button onClick={onClick}>OK</button>
    </div>
  </div>
}


export default Modal