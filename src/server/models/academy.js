const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AcademySchema = new Schema({
   
},
    {
        collection: "academy"
    });


const AcademyStepsSchema = new Schema({

}, {
    collection: "academy_steps"
});

module.exports = {
    academy: mongoose.model('AcademySchema', AcademySchema),
    academySteps: mongoose.model('AcademyStepsSchema', AcademyStepsSchema),
}