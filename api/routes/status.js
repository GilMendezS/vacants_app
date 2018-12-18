const router = require('express').Router();
const StatusController = require('../controllers/statusVacant');

router.get('/', StatusController.getStatuses);

router.get('/:id', StatusController.getStatus);

router.post('/', StatusController.addStatus);

router.put('/:id', StatusController.updateStatus);

router.delete('/:id', StatusController.removeStatus);

module.exports = router;