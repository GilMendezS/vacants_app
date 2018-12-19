const router = require('express').Router();
const JobController = require('../controllers/job');
const middlewares = require('../middlewares/verify_token');
router.get('/', [middlewares.check_token], JobController.getJobsOfUser);

router.post('/', [middlewares.check_token],JobController.addJob);

router.delete('/:id', JobController.removeJob);

module.exports = router;