var router = require('express').Router();
const checkToken  = require("./utils/tokenValidation");
router.use('/tennismgmt/registration/authed',checkToken,require('./api/registrationpage/registrationPageCtrl'));
router.use('/tennismgmt/registration',require('./api/registrationpage/registrationPageRoutes'));
router.use('/tennismgmt/login',require('./api/login/loginCtrl'));


module.exports = router;