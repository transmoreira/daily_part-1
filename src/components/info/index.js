const Info = ({name})=>{
  
    return <div style={styleBox}>
            <p style={styleP}>
                Olá {name} seu cadastro no DEER esta vencido.<br/>
                Evite multa do DEER.<br/><br/>
                Entregue na garagem matriz os seguintes documentos:
            </p>
            
            <ul style={styleUl}>
                <li style={styleLi}>Cópia da Carteira de Habilitação(Autenticada em cartorio)</li>
                <li style={styleLi}>Nada Consta do DETRAN</li>
                <li style={styleLi}>Certidão Criminal</li>
                <li style={styleLi}>Cópia de Comprovante de endereço</li>
                <li style={styleLi}>Cópia de Carteira de Trabalho(Paginas com Foto, dados e contrato)</li>
                <li style={styleLi}>Cópia do curso Resolução 168</li>
            </ul>

            <p style={styleP}>Se a carteira de Habilitação for digital nao precisa autenticar em cartorio<br/><br/>
            Atestado de bons antecedentes não vale como certidão criminal negativa<br/>
            A certidão pode ser retirada<br/><a href="https://rupe.tjmg.jus.br/rupe/justica/publico/certidoes/criarSolicitacaoCertidao.rupe?solicitacaoPublica=true" style={{color:"white", backgroundColor:"green", padding:"0 5px "}}>clicando aqui</a></p>
        </div>
}

const styleBox = {
    border: "1px solid gray",
    width:500,
    background:"purple",
    color:"yellow",
    margin:"auto",
    paddingBottom:20, 
    zIndex:9999999
}

const styleP = {
    fontSize:20,
    textTransform:"uppercase",
    margin:20
}

const styleUl = {
    margin:20
}

const styleLi = {
    border: "none",
    textAlign:"left"

}
export default Info