const router = require("express").Router();
const { academy, academySteps } = require('./../../models/academy');
const basicInformation = require("./../../models/basicInformation");
router.route('/').get(async (req, res, next) => {
    const email = req.user[0].email;
    const academyData = await academy.find({}, { __v: 0, _id: 0 });
    let academyStepsData = await academySteps.find({}, { __v: 0, _id: 0 });
    academyStepsData = JSON.parse(JSON.stringify(academyStepsData));
    let basicInfoData = await basicInformation.findOne({ email: email }, { _v: 0, _id: 0 });
    basicInfoData = JSON.parse(JSON.stringify(basicInfoData));
    let courses = basicInfoData?.courses;
    if (courses) {
        let coursesKey = Object.keys(courses);
        academyStepsData[0].courses.forEach((each) => {
            if (coursesKey.includes(each.slug)) {
                each.activeStep = courses[each.slug];
            }
        });     
    }
    res.send({ academyData, academyStepsData });
});

router.route('/').post(async (req, res, next) => {
    const email = req.user[0].email;
    const { slug, steps } = req.body;
    let basicInfoData = await basicInformation.findOne({ email: email }, { _v: 0, _id: 0 });
    basicInfoData = JSON.parse(JSON.stringify(basicInfoData));
    let updatedresp;
    if (!Object.keys(basicInfoData).includes('courses')) {
         updatedresp = await basicInformation.updateOne({ email: email }, {
            $set: {
                courses: {
                    [slug]: steps
                }
            }
        });
    } else {
        let prop = `courses.${slug}`;
        updatedresp = await basicInformation.updateOne({ email: email }, {
            $set: {
                [prop]: steps
            }
        });
    }
    if (updatedresp) {
        res.send({ msg: 'data updated' })
    }
});

module.exports = router;
