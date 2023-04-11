const router = require('express').Router();
const adminRoute = require('./admins');
const authRoute = require('./auth');
const projectRoute = require('./projects');
const userRoute = require('./users');

router.use('/auth', authRoute);

router.use('/admin', adminRoute);

router.use('/project', projectRoute);

router.use('/users/log', userRoute);

module.exports = router;
