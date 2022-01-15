const router = require('express').Router();
const test = require('./../../models/testCollection');
const { genSaltSync, hashSync } = require('bcrypt');
const basicInformation = require('./../../models/basicInformation');
const competancymetadata = require("./../../models/competancymetadata");
const competancyBundleSchema = require("./../../models/competencybundledata");
const userCompetancySchema = require("./../../models/usercompetancy");


router.route('/').get(async(req,res,next)=>{
    const aa = await basicInformation.find({});
    res.send({a:aa})
});

router.route('/emailvalidation').get(async(req,res,next)=>{
    const email = req.query.email;
    const aa = await basicInformation.find({email: email});
    res.send({isUnique:aa.length === 0})
});

router.route('/:role').post(async(req,res,next)=>{
    const salt = genSaltSync(10);
    const {body,params} = req;
    const current_level = body.current_level;
    const orginalPassword = body.password; 
    body.password = hashSync(body.password,salt);
    const respArr = [];
    let competancyBundleArr = [];
    const saveObj = {...body,...params,user_name:body.email,temp_password:orginalPassword};
    const email = await basicInformation.find({email:body.email},{email:1});



    if(email.length == 0){
        basicInformation.create(saveObj).then(async(output)=>{
            // const insertIntoUserCollection = await userCompetancySchema.insertMany([...addOtherInfo]).catch((err)=>{
            //     console.log(err);
            // })
            // console.log(insertIntoUserCollection)
            output.status = 200;
            output.msg = "Data inserted successfully..!!!";
            respArr.push(output._doc);
            res.status(200).send(respArr)
        }).catch((err)=>{
            console.log(err);
            res.status(504).send({status:504,msg : "Error in inserting data..!!!"});
        })
    }else{
        res.status(403).send({msg:"user already exsist",status:403});
    }   
});

module.exports = router;