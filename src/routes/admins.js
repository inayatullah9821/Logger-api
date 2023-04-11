const router = require('express').Router();
const { authenticate, checkRole } = require('../middleware/authentication');

const {
  createUser,
  deleteUser,
  getLoggedHours,
} = require('../controller/admins');


router.use([authenticate, checkRole]);

router.post('/', createUser);

router.delete('/:userId', deleteUser);

router.get('/', getLoggedHours);

module.exports = router;