const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCompetancySchema = new Schema({
    date:{
        type:String,
    },
    competency:{
        type:String,
        required:true,
    }, 
    competency_bundle:{
        type:String,
        required:true,
    },
    itn_level:{
        type:String,
        required:true,
    },
    default_weight:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    assigned_weight:{
        type:Number,
        required:true,
    }
    

},
{
    collection:"users_competancy_list"
});
module.exports = mongoose.model('userCompetancySchema',userCompetancySchema)