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
    const itnWeights = `${current_level}_weight`;
    // let metaObj = await competancymetadata.find({},{_id:0}).catch((err)=>{
    //     console.log(err);
    //     res.status(504).send({
    //         status:504,
    //         errMsg:"metadata for competancy collection is not ready"
    //     })
    // });
    // metaObj = JSON.parse(JSON.stringify(metaObj))
    // const {itn_competancy_mapping }= metaObj[0];


    // for(itn in itn_competancy_mapping){
    //     if(itn == current_level){
    //         competancyBundleArr.push(...itn_competancy_mapping[itn]);
    //     }
    // }

    // const match = {
    //     "competency_bundle":{"$in":[...competancyBundleArr]},
    //     [itnWeights]:{$gt:0}

    // };
    // const group = {
    //     "_id":{"competency_bundle":"$competency_bundle"},
    //     "values":{
    //         "$push":{
    //             "competency":"$competency",
    //          "competency_bundle":"$competency_bundle",
    //             "default_weight":"$default_weight",
    //             [itnWeights]:`$${itnWeights}`
    //         }
    //     }
    // };
    // const project = {
    //     _id:0,
    //     "values":1
    // }

    // const compentancyData = await competancyBundleSchema.aggregate([
    //     {"$match":{...match}},
    //     {"$group":{...group}},
    //     {"$project":{...project}}

    // ]).catch((err)=>{
    //     console.log(err);
    // });
    // console.log(compentancyData)
    // let factoredCompData = compentancyData.reduce((acc,curr)=>{
    //     console.log(curr.values)
    //     if(acc){
    //         acc.push(...curr.values)
    //     }
    //     return acc;
    // },[]);

    // let addOtherInfo = factoredCompData.reduce((acc,curr)=>{
    //     if(acc){
    //         curr.load_date = new Date().toISOString().slice(0,10);
    //         curr.email = body.email;
    //         curr.itn_level = current_level;
    //         curr.assigned_weight = 0;
    //         acc.push(curr);
    //     }
    //     return acc;

    // },[]);
    // console.log(addOtherInfo)

   


    // console.log(factoredCompData)

    if(email.length == 0){
        basicInformation.create(saveObj).then(async(output)=>{
            console.log(competancyBundleArr)
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