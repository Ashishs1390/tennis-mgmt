const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AcademySchema = new Schema({
   
},
    {
        collection: "academy_course_steps"
    });


const AcademyStepsSchema = new Schema({

}, {
    collection: "academy_courses"
});

module.exports = {
    academy: mongoose.model('AcademySchema', AcademySchema),
    academySteps: mongoose.model('AcademyStepsSchema', AcademyStepsSchema),
}