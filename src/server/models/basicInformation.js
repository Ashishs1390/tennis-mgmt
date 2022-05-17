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
    }
},
    {
        collection: "basic_information"
    });
module.exports = mongoose.model('basicInformation', basicInformationSchema)