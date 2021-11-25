const router = require("express").Router();
const test = require("./../../models/testCollection");
const { genSaltSync, hashSync } = require("bcrypt");
const basicInformation = require("./../../models/basicInformation");

router.route("/").get(async (req, res, next) => {
  const data = await basicInformation.find(
    { email: req.user[0].email },
    { first_name: 1, last_name: 1, email: 1, role: 1, user_name: 1, _id: 0 }
  );
  res.send({ data });
});


router.route("/").put(async(req,res,next)=>{
    const {first_name,last_name,email} = req.body;
    let userObj = {first_name,last_name};
    console.log(req.body["email"] !== undefined)
    if(req.body["email"] !== undefined){
        let userDetails = await basicInformation.find({email},{email:1,_id:0});
        console.log(userDetails)
        if(userDetails.length == 0){
            console.log("in if")
            userObj = {...userObj,email}
        }else{
            res.status(404).send({msg:"user exist",status:403});
    
        }
    }

   console.log("---------userObj----------")
    console.log(userObj)
        const updatedData = await basicInformation.updateOne(
            {email: req.user[0].email},{$set:{
                ...userObj
            }},{
                upsert:false
            }).catch((err)=>{
                console.log(err);
                res.status(504).json({
                    errMsg:"internal server error"
                })
            })
        if(updatedData.length != 0){
            console.log(updatedData);
            res.send(updatedData);
        }
   

    
});

module.exports = router;
