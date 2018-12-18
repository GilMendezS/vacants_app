const express = require('express');
const router = express.Router();
const ContractController = require('../controllers/contract');

router.get('/', ContractController.getContracts);

router.get('/:id', ContractController.getOneContract);

router.post('/', ContractController.addContract);

router.put('/:id', ContractController.updateContrct);

router.delete('/:id', ContractController.removeContract);

module.exports = router;