const router = require("express").Router();
const videoanalysis = require("./../../models/videoInformation");
const videoHistoryInfoSchema = require("./../../models/videohistoryinformation");
const { v4: uuidv4 } = require('uuid');


router.route('/').post(async(req,res,next)=>{

    const { email, role, selected_child } = req.user[0];
    let matchkey = role == "player" ? email : selected_child;


    const obj = {
        ...req.body,
        //user_name:req.user[0].email
        user_name:matchkey

    }
    const {date} = req.body;
    const data = await videoanalysis.findOneAndUpdate({ email: matchkey},{
        $set:{...obj}
    },{
        upsert:true,
        returnOriginal: false
    }).catch((err)=>{
        console.log(err);
        res.status(504).send({
            errMsg:"internal server error",status:504
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
                acc["$push"]["frames"]["$each"].push({date:date,src:val,id:uuidv4()});
            }
            return acc;
        },{"$push":{"frames":{"$each":[]}}})
        
        videoHistoryInfoSchema.updateOne({email:req.user[0].email},
            {
                ...pushObj,
                "$set": { email: req.matchkey}
            },{
                upsert:true,
                returnNewDocument: false
            }
            ).then((output)=>{
                console.log("----------output-----------")
                console.log(output);
        })
        const resObj = data._doc;
        console.log("---------------resObj---------------------")
        console.log(resObj)
        res.send({
            ...resObj
        });

    }

    if(data && data.length > 0) {
        const resObj = data._doc;
        res.send({
            ...resObj
        });
    } else {
        res.status(404).send({
            msg:"no data",status:404
        })
    }
    




   
});

router.route('/').get(async (req, res, next) => {
    console.log(req.user[0]);
    const { email, role, selected_child } = req.user[0];
    let matchkey = role == "player" ? email : selected_child;
    const data = await videoanalysis.find({ email: matchkey},{_v:0,_id:0}).catch((err)=>{
        console.log(err);
        res.status(504).send({
            errMsg:"internal server error",status:504
        })
    });
    console.log(data);
    let resObj;
    if(data.length != 0){
        resObj = data[0]._doc;
        res.send({...resObj})

    }else{
        res.status(404).send({
            errMsg:"no data",status:404
        })
    }
    

});

router.route('/history').get(async (req, res, next) => {
    const { email, role, selected_child } = req.user[0];
    let matchkey = role == "player" ? email : selected_child;
    const data = await videoHistoryInfoSchema.find({ email: matchkey},{_v:0,_id:0}).catch((err)=>{
        console.log(err);
        res.status(504).send({
            errMsg:"internal server error",status:504
        })
    });
    if(data.length != 0){
        const resObj = data[0]._doc;
        res.send({...resObj})
    }else{
        res.status(404).send({
            errMsg:"no data",status:404
        })
    }


});






module.exports = router;