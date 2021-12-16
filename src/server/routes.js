var router = require('express').Router();
const checkToken  = require("./utils/tokenValidation");
router.use('/tennismgmt/registration/authed',checkToken,require('./api/registrationpage/registrationPageCtrl'));
router.use('/tennismgmt/registration',require('./api/registrationpage/registrationPageRoutes'));
router.use('/tennismgmt/login',require('./api/login/loginCtrl'));
router.use('/tennismgmt/videoanalysis',checkToken,require('./api/videoanalysispage/videoanalysispageCtrl'));
router.use('/tennismgmt/videolibrary',require("./api/videoanalysispage/videolibrary"));
router.use('/tennismgmt/list/agegrouplist',require("./api/list_collection/list_collection"));

module.exports = router;