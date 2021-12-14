const config = require("./../config/index")
console.log("-----db------")
console.log(config.dbUrl);

require('mongoose').connect(`${config.dbUrl}`).then(()=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
    console.log(err);
});