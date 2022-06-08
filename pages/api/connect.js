const mysql = require('serverless-mysql')({
    config: {
      host     : process.env.ENDPOINT,
      database : process.env.DATABASE,
      user     : process.env.USERNAME_DB,
      password : process.env.PASSWORD_DB
    }
  })



const connect = async (sql)=>{
  //console.log(mysql)
    try{
      //console.log(13)
      const result = await mysql.query(sql)
      //console.log(14,result)
        mysql.end()
        //console.log(16,result)
        return result    
    }catch(erro){
      console.log(19,erro)
        connect(sql)
    }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
}
export default connect
