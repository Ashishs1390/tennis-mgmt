const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCompetancySchema = new Schema({
    email:{
        type:String,
        required:true
    },
    assessment_date:{
        type:String,
        required:true
    },
    current_level:{
        type:String,
        required:true
    },
    competency_bundle:{
        type:String,
        required:true
    },
    values:{
        type:Array,
        required:true
    }

},
{
    collection:"users_competancy_list"
});
module.exports = mongoose.model('userCompetancySchema',userCompetancySchema);


