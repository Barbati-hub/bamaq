const db = require('../db/conn');
const mysql = require('mysql');

class Cliente {
    constructor(data, nome, cpfCNPJ) {
        this.data = data;
        this.nome = nome;
        this.cpfCNPJ = cpfCNPJ;
    }
    
    
}

module.exports = Cliente;
