const config = require("./../config/index")
require('mongoose').connect(`${config.dbUrl}`).then(()=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
    console.log(err);
});