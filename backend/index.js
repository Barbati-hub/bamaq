const db = require('./db/conn')

const express = require('express')
const cors = require('cors')

const app = express();

const ClienteRoutes = require('./routes/ClienteRouter')

app.use(express.json())

app.use(cors({crendials:true, origin: 'https://localhost:3000'}))

app.use(express.static('public'))

app.use('/menu', ClienteRoutes);

const clientes = async() => {
    await db.execute('SELECT * FROM cliente')
    
}

module.exports = clientes;





app.listen(5000)


