const router = require('express').Router();
const VacantController = require('../controllers/vacant');
const middleware = require('../middlewares/verify_token');


router.get('/',VacantController.getActiveVacants);

router.get('/all', [middleware.check_token],VacantController.getAllVacants);

router.get('/my-vacants',[middleware.check_token], VacantController.publishedVacants);

router.get('/filter/:search', VacantController.filter);

router.get('/:id', VacantController.getVacant);

router.post('/', [middleware.check_token],VacantController.addVacant);

router.post('/:id/apply', [middleware.check_token], VacantController.apply);

router.put('/:id', [middleware.check_token],VacantController.updateVacant);

router.delete('/:id', [middleware.check_token], VacantController.removeVacant)

module.exports = router;