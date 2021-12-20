const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCompetancySchema = new Schema({
    load_date:{
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
    },
    u12boys_weight:{
        type:Number,
    },
    u12girls_weight:{
        type:Number,
    },
    u14boys_weight:{
        type:Number,
    },
    u14girls_weight:{
        type:Number,
    },
    u16boys_weight:{
        type:Number,
    },
    u18boys_weight:{
        type:Number,
    },
    

},
{
    collection:"users_competancy_list"
});
module.exports = mongoose.model('userCompetancySchema',userCompetancySchema);