var router = require('express').Router();
router.use('/tennismgmt/registration',require('./api/registrationpage/registrationPageRoutes'));
router.use('/tennismgmt/login',require('./api/login/loginCtrl'));


module.exports = router;