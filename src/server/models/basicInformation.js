const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const basicInformationSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    current_level: {
        type: String
    },
    goal_level: {
        type: String
    },
    parent_email: {
        type: Array
    },
    coach_email: {
        type: Array
    },
    children_email: {
        type:Array
    },
    temp_password: {
        type: String
    },
    order_id: {
        type:String
    },
    isPayment: {
        type:String
    },
    courses: {
        type: Object
    },
    yob: {
        type: String
    },
    weight: {
        type: String
    },
    weight_lb: {
        type: String
    },
    weight_kg: {
        type: String
    },
    height: {
        type: String
    },
    height_cm: {
      type:String  
    },
    height_inch: {
      type:String  
    },
    time_frame :{
        type: String
    },
    racquet: {
        type: String
    },
    racquet_string: {
        type: String
    },
    racquet_tension: {
        type: String
    },
    plays: {
        type:String
    },
    forehand: {
        type:String
    },
    backhand: {
        type:String
    },
    player_type: {
        type:String
    },
    notes: {
        type:String
    },
    height_type: {
        type:String
    },
    weight_type: {
        type:String
    }

},
    {
        collection: "basic_information"
    });
module.exports = mongoose.model('basicInformation', basicInformationSchema)