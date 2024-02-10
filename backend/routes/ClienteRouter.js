const router = require('express').Router();

const ClienteController = require('../controllers/ClienteController')


router.get('/create', ClienteController.create)
router.get('/', ClienteController.getAllClient)

router.get('/:cpfCNPJ', ClienteController.getclienteporcpf)
router.patch('/:cpfCNPJ', ClienteController.updatecliente)

router.delete('/:cpfCNPJ', ClienteController.deletecliente)

router.get('/cadastrar', ClienteController.cadastrar)


module.exports = router