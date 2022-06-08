export default  ()=>{
  
    return <div style={styleBox}>
            <p style={styleP}>
                Atenção srs motoristas.<br/>
                Estamos realizando atualização de endereço.<br/><br/>
                Favor enviar foto de um comprovante de endereço atualizado e seu e-mail<br/> para o whatsapp (31) 99139-6716<br/> (Junior Trafego Matriz)
            </p>  
        </div>
}

const styleBox = {
    border: "1px solid gray",
    width:500,
    background:"green",
    color:"yellow",
    margin:"auto",

}

const styleP = {
    fontSize:20,
    textTransform:"uppercase",
    margin:20
}