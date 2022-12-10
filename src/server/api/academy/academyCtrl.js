const router = require("express").Router();
const { academy, academySteps } = require('./../../models/academy');
router.route('/').get(async (req, res, next) => {
    const email = req.user[0].email;
    const academyData = await academy.find({}, { __v: 0, _id: 0 });
    const academyStepsData = await academySteps.find({}, { __v: 0, _id: 0 });

    console.log(academyData);
    res.send({ academyData, academyStepsData });
});

router.route('/').post(async (req, res, next) => {
    console.log(req.body);
    const { slug, steps } = req.body;
    
    
});

module.exports = router;

// let obj = {
// courses: {  
//     'course-name': {
//         steps:1
//     }
// }
// }
