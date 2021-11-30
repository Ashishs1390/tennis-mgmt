const router = require("express").Router();
const videoanalysis = require("./../../models/videohistoryinformation");


router.route('/').post(async(req,res,next)=>{
    res.send({
        "a":"10"
    });
});

module.exports = router;