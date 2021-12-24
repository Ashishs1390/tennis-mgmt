const router = require('express').Router();
const userCompetancySchema = require("./../../models/usercompetancy");
const competancymetadata = require("./../../models/competancymetadata");

router.route('/').get(async(req,res,next)=>{
    let {current_level} = req.body;
    current_level = current_level;
    const userEmail = req.user[0].email;
    const itnWeights = `${current_level}_weight`;
    const match = {
        "email":userEmail
    };
    const group = {
        "_id":{
            "competency_bundle":"$competency_bundle",
            "itn_level":"$itn_level",
            "load_date":"$load_date"
        },
        "values":{
            "$push":{
                    "competency":"$competency",
                    "assigned_weight":"$assigned_weight",
                    [itnWeights]:`$${itnWeights}`
                }
            }
    };
    const project = {
        "_id":0,
        "competency_bundle":"$_id.competency_bundle",
        "load_date":"$_id.load_date",
        "itn_level":"$_id.itn_level",
        "values":1
    };

    let compentancyData = await userCompetancySchema.aggregate([
        {"$match":{...match}},
        {"$group":{...group}},
        {"$project":{...project}}

    ]).catch((err)=>{
        console.log(err);
    });

    compentancyData = JSON.parse(JSON.stringify(compentancyData));
    let metaObj = await competancymetadata.find({},{_id:0}).catch((err)=>{
        console.log(err);
        res.status(504).send({
            status:504,
            errMsg:"metadata for competancy collection is not ready"
        })
    });
    metaObj = JSON.parse(JSON.stringify(metaObj))
    const {itn_competancy_mapping }= metaObj[0];
    const sortingArr = itn_competancy_mapping[current_level];
    console.log(sortingArr);

    compentancyData = compentancyData.map((item)=>{
        var n = sortingArr.indexOf(item.competency_bundle)
        item.values.sort((a,b)=> parseInt(b[itnWeights]) - parseInt(a[itnWeights]) )
        return [n,item];
    }).sort().map(function(j) { return j[1] })

    res.send([...compentancyData])
});

module.exports = router;