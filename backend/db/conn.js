const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dd@84255798',
    database: 'bamaq'
});

conn.connect((err)=>{
    if(err){
    console.log('Erro ao Conectar', err);
    return;
    }
    console.log('Conexao bem sucedida')
});

module.exports = conn