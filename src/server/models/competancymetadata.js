const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const competancyMetadataSchema = new Schema({
    table_name:{
        type:String,
    },
    itn_level:{
        type:Array,
    }, 
    itn_level_mapping:{
        type:Object,
    },
    itn_competancy_mapping:{
        type:Object,
        required:true,
    }
},
{
    collection:"competancy_metadata"
});
module.exports = mongoose.model('competancyMetadataSchema',competancyMetadataSchema)