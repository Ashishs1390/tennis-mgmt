const router = require('express').Router();
// const listCollectionSchema = require('./../../models/listCollection');
const competancymetadata = require("./../../models/competancymetadata")


router.route('/').get(async(req,res,next)=>{
    let listData = await competancymetadata.find({},{_id:0}).catch((err=>{
        res.status(504).json({
            errMsg:"internal server error",
            status:504
        })
    }));
    if(listData && listData.length >0){
        console.log(listData)
        listData = JSON.parse(JSON.stringify(listData));
        res.send(listData[0])
    }
});

module.exports = router;