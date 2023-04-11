const router = require('express').Router();
const { authenticate, checkRole } = require('../middleware/authentication');

const {
  createUser,
  deleteUser
} = require('../controller/admins');


router.use([authenticate, checkRole]);

router.post('/', createUser);

router.delete('/:userId', deleteUser);

module.exports = router;