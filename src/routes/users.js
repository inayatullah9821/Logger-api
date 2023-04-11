const router = require('express').Router();
const { authenticate } = require('../middleware/authentication');

const {
  logHours,
  updateLogHours,
  deleteLogHours,
} = require('../controller/users');

router.use(authenticate);

router.post('/:projectId', logHours);

router.patch('/:logId', updateLogHours);

router.delete('/:logId', deleteLogHours);

module.exports = router;