const router = require("express").Router();
const videoanalysis = require("./../../models/videoInformation");
const videoHistoryInfoSchema = require("./../../models/videohistoryinformation");


router.route('/').post(async(req,res,next)=>{
  
    const obj = {
        ...req.body,
        user_name:req.user[0].email

    }
    const {date} = req.body;
    const data = await videoanalysis.findOneAndUpdate({email: req.user[0].email},{
        $set:{...obj}
    },{
        upsert:true,
        returnNewDocument: false
    }).catch((err)=>{
        console.log(err);
        res.status(504).send({
            msg:"internal server error",status:504
        })
    });
    let srcArr = [];
    if(data){

        for (d in data){
            if(d.includes("frame") && data[d] !== undefined){
                srcArr.push(data[d])
            }
        }

        const pushObj = srcArr.reduce((acc,val)=>{
            if(acc){
                acc["$push"]["frames"]["$each"].push({date:date,src:val})
            }
            return acc;
        },{"$push":{"frames":{"$each":[]}}})
        
        videoHistoryInfoSchema.updateOne({email:req.user[0].email},
            {
                ...pushObj,
                "$set":{email:req.user[0].email}
            },{
                upsert:true,
                returnNewDocument: false
            }
            ).then((output)=>{
                console.log(output);
        })
    }


    const resObj = data._doc;



    res.send({
        ...resObj
    });
});

router.route('/').get(async(req,res,next)=>{
    const data = await videoanalysis.find({email: req.user[0].email},{_v:0,_id:0}).catch((err)=>{
        console.log(err);
        res.status(504).send({
            msg:"internal server error",status:504
        })
    });
    console.log(data);
    let resObj;
    if(data.length != 0){
        resObj = data[0]._doc;
        res.send({...resObj})

    }else{
        res.status(404).send({
            msg:"no data",status:404
        })
    }
    

});

router.route('/history').get(async(req,res,next)=>{
    const data = await videoHistoryInfoSchema.find({email: req.user[0].email},{_v:0,_id:0}).catch((err)=>{
        console.log(err);
        res.status(504).send({
            msg:"internal server error",status:504
        })
    });
    if(data.length != 0){
        const resObj = data[0]._doc;
        res.send({...resObj})
    }else{
        res.status(404).send({
            msg:"no data",status:404
        })
    }


});






module.exports = router;