const mysql = require('serverless-mysql')({
    config: {
      host     : process.env.ENDPOINT,
      database : process.env.DATABASE,
      user     : process.env.USERNAME_DB,
      password : process.env.PASSWORD_DB
    }
  })

const connect = async (sql)=>{
    const result = await mysql.query(sql)
    mysql.end()
    return result       
}

export default connect