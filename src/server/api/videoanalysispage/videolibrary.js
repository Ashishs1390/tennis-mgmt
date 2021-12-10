const router = require("express").Router();
const videoLibrarySchema = require("./../../models/videolibrary")

router.route('/').get(async(req,res,next)=>{
    let libData = await videoLibrarySchema.find({},{_id:0}).catch((err=>{
        res.status(504).json({
            errMsg:"internal server error",
            status:504
        })
    }));

    if(libData && libData.length >0){
        libData = JSON.parse(JSON.stringify(libData));
        console.log(libData)
        res.send(libData)
    }

});

module.exports = router;