const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const competancyBundleSchema = new Schema({
   
},
{
    collection:"competency_bundle_data"
});
module.exports = mongoose.model('competancyBundleSchema',competancyBundleSchema)