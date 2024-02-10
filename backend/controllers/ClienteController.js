const Cliente = require('../models/Cliente');
const { createPool } = require('mysql2/promise');


const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamaq'
});

module.exports = class ClienteController {

    static async create(req, res) {
        const { data, nome, cpfCNPJ } = req.body;

        if (!data) {
            res.status(422).json({ message: 'A data, é obrigatório' });
            return;
        }
        if(!nome){
            res.status(422).json({ message: 'O nome é Obrigatório' });
        }
        if(!cpfCNPJ){
            res.status(422).json({ message: 'O cpfCNPJ é Obrigatório' });
        }


        const cliente = new Cliente(data, nome, cpfCNPJ);

        try {
            const connection = await pool.getConnection();
            const [result] = await connection.query(
                'INSERT INTO cliente (data, nome, cpfCNPJ) VALUES (?, ?, ?)',
                [cliente.data, cliente.nome, cliente.cpfCNPJ]
            );

            connection.release();

            res.status(200).json({ message: `${nome} cadastrado com sucesso`, newCliente: { id: result.insertId, ...cliente } });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    static async getAllClient(req, res) {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.query('SELECT * FROM cliente ORDER BY idcliente DESC');
            connection.release();

            res.status(200).json({ clientes: rows });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getclienteporcpf(req, res){
        const cpfCNPJ = req.params.cpfCNPJ;

        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.query('SELECT * FROM cliente WHERE cpfCNPJ = ? ORDER BY idcliente DESC', [cpfCNPJ]);
            connection.release();
            // console.log(cpfCNPJ)
            if (rows.length > 0) {
                res.status(200).json({ clientes: rows });
            } else {
                res.status(404).json({ message: 'Cliente não encontrado para o CPF/CNPJ fornecido.' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }

    }

    static async updatecliente(req, res){
        const cpfCNPJ = req.params.cpfCNPJ

        const {data, nome,  } = req.body;

        // const data = new Date();

        const updateData = {}

        if (!data) {
            res.status(422).json({ message: 'A data, é obrigatório' });
            return;
        }else {
            updateData.data = data;
        }
        if(!nome){
            res.status(422).json({ message: 'O nome é Obrigatório' });
        }else {
            updateData.nome = nome;
        }
        if(!cpfCNPJ){
            res.status(422).json({ message: 'O nome é Obrigatório' });
        }else {
            updateData.cpfCNPJ = cpfCNPJ;
        }

        const cliente = new Cliente(data, nome, cpfCNPJ);

        try {
            const connection = await pool.getConnection();
        const [result] = await connection.query(
            'UPDATE cliente SET data = ?, nome = ? WHERE cpfCNPJ = ?',
            [updateData.data, updateData.nome, updateData.cpfCNPJ]
            );

            connection.release();

            res.status(200).json({ message: `${nome} alterado com sucesso`, newCliente: { idcliente: result.insertidcliente, ...cliente } });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    static async deletecliente(req, res){
        const cpfCNPJ = req.params.cpfCNPJ;
        try {
            const connection = await pool.getConnection();
    
            const [checkResult] = await connection.query('SELECT * FROM cliente WHERE cpfCNPJ = ?', [cpfCNPJ]);
    
            if (checkResult.length === 0) {
                res.status(404).json({ message: 'Cpf ou CNPJ não emcontrado' });
                return;
            }
    
            await connection.query('DELETE FROM cliente WHERE cpfCNPJ = ?', [cpfCNPJ]);
            connection.release();
    
            res.status(200).json({ message: 'Cliente excluído com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }


    }

    static async cadastrar(req, res) {
        const { nome, cpfCNPJ } = req.body;

        const data = new Date(); 
        if(!nome){
            res.status(422).json({ message: 'O nome é Obrigatório' });
        }
        if(!cpfCNPJ){
            res.status(422).json({ message: 'O cpfCNPJ é Obrigatório' });
        }


        const cliente = new Cliente(data, nome, cpfCNPJ);

        try {
            const connection = await pool.getConnection();
            const [result] = await connection.query(
                'INSERT INTO cliente (data, nome, cpfCNPJ) VALUES (?, ?, ?)',
                [cliente.data, cliente.nome, cliente.cpfCNPJ]
            );

            connection.release();

            res.status(200).json({ message: `${nome} cadastrado com sucesso`, newCliente: { id: result.insertId, ...cliente } });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}


// para incluir com a Data atual 
// usa const data = new Date(); 
// e não precisa incluir a data manualmente
