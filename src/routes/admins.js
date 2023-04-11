const router = require('express').Router();
const { authenticate, checkRole } = require('../middleware/authentication');

const {
  createUser,
} = require('../controller/admins');


router.use([authenticate, checkRole]);

router.post('/', createUser);

module.exports = router;