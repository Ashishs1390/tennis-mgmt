const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listCollectionSchema = new Schema({
    ageGroupList:{
        type: Array
    }
},
{
    collection:"list_collection"
});
module.exports = mongoose.model('listCollection', listCollectionSchema)