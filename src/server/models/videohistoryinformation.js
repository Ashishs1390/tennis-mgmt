const mongoose = require('mongoose');
const { array } = require('prop-types');
const Schema = mongoose.Schema;

const videoHistoryInfoSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    
   frames:{
       type:Array
   }

},
{
    collection:"video_history_info"
});
module.exports = mongoose.model('videoHistoryInfoSchema',videoHistoryInfoSchema)