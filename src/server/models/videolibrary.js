const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoLibrarySchema = new Schema({
    id:{
        type:String,
    },
    src:{
        type:String,
        required:true,
    }, title:{
        type:String,
        required:true,
    }
    

},
{
    collection:"library_video"
});
module.exports = mongoose.model('videoLibrarySchema',videoLibrarySchema)