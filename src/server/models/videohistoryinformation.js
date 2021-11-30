const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoHistoryInfoSchema = new Schema({
    user_name:{
        type:String,
        required:true,

    },
    frame1:{
        type:String
    },
    frame2:{
        type:String
    },
    frame3:{
        type:String
    },
    frame4:{
        type:String
    },
    date:{
        type:String
    }

},
{
    collection:"video_history_info"
});
module.exports = mongoose.model('videoHistoryInfoSchema',videoHistoryInfoSchema)