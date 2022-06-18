var router = require('express').Router();
var cors = require('cors')
// var headers = new Headers();
// headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');
var corsOptions = {
    "origin": "http://localhost:3001",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    mode: 'same-origin',
    credentials: true,
    redirect: 'follow',
    // credentials: 'include',
    "preflightContinue": true,
    // headers: headers,
    "changeOrigin": true,
    "cookieDomainRewrite": "localhost",
    "optionsSuccessStatus": 204
}
var corsOptions1 = {
    "origin": "http://localhost:3001",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    //     // mode: 'same-origin',
    //     // credentials: true,
    //     // redirect: 'follow',
    credentials: 'include',
    //     // "preflightContinue": true,
    //     // headers: headers,
    //     // "changeOrigin": true,
    //     // "cookieDomainRewrite": "localhost",
    //     // "optionsSuccessStatus": 204
};
const checkToken = require("./utils/tokenValidation");
// const requestObjectCreation = require("./utils/requestCreation")
router.use('/tennismgmt/registration/authed', cors(corsOptions1), checkToken, require('./api/registrationpage/registrationPageCtrl'));
router.use('/tennismgmt/registration', cors(corsOptions), require('./api/registrationpage/registrationPageRoutes'));
router.use('/tennismgmt/login', cors(corsOptions),require('./api/login/loginCtrl'));
router.use('/tennismgmt/user', cors(corsOptions), require('./api/login/loginCtrl'));
router.use('/tennismgmt/videoanalysis', cors(corsOptions1), checkToken, require('./api/videoanalysispage/videoanalysispageCtrl'));
router.use('/tennismgmt/videolibrary', cors(corsOptions1), checkToken, require("./api/videoanalysispage/videolibrary"));
router.use('/tennismgmt/list/agegrouplist', cors(corsOptions), require("./api/list_collection/list_collection"));
router.use('/tennismgmt/competancy', cors(corsOptions1), checkToken ,require("./api/competencylist/competencyListCtrl"));
router.use('/tennismgmt/linktoplayer', cors(corsOptions1), checkToken ,require("./api/linktoplayer/linkToPlayerCtrl"));
router.use('/tennismgmt/bundleaggdata', cors(corsOptions1), checkToken, require("./api/bundleaggregation/bundleAggCtrl"));
router.use('/tennismgmt/itn_level', cors(corsOptions) ,require("./api/linktoplayer/linkToPlayerAuthed"));
    
    

module.exports = router;