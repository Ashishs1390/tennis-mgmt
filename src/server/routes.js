var router = require('express').Router();
const checkToken = require("./utils/tokenValidation");
// const requestObjectCreation = require("./utils/requestCreation")
router.use('/tennismgmt/registration/authed', checkToken, require('./api/registrationpage/registrationPageCtrl'));
router.use('/tennismgmt/registration', require('./api/registrationpage/registrationPageRoutes'));
router.use('/tennismgmt/login', require('./api/login/loginCtrl'));
router.use('/tennismgmt/user', require('./api/login/loginCtrl'));
router.use('/tennismgmt/videoanalysis', checkToken, require('./api/videoanalysispage/videoanalysispageCtrl'));
router.use('/tennismgmt/videolibrary', checkToken, require("./api/videoanalysispage/videolibrary"));
router.use('/tennismgmt/list/agegrouplist', require("./api/list_collection/list_collection"));
router.use('/tennismgmt/competancy', checkToken ,require("./api/competencylist/competencyListCtrl"));
router.use('/tennismgmt/linktoplayer', checkToken ,require("./api/linktoplayer/linkToPlayerCtrl"));
router.use('/tennismgmt/bundleaggdata', checkToken, require("./api/bundleaggregation/bundleAggCtrl"));


module.exports = router;