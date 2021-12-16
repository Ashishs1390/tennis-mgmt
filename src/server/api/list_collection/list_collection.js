const router = require('express').Router();
const listCollectionSchema = require('./../../models/listCollection');

router.route('/').get(async(req,res,next)=>{
    let listData = await listCollectionSchema.find({}).catch((err=>{
        res.status(504).json({
            errMsg:"internal server error",
            status:504
        })
    }));
    console.log('#####:#####', listData);
    if(listData && listData.length >0){
        listData = JSON.parse(JSON.stringify(listData[0].ageGroupList));
        res.send(listData)
    }

});

module.exports = router;