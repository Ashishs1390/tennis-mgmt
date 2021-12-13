const config = require("./../config/index")
console.log("-----db------")
console.log(config);

require('mongoose').connect(`mongodb://localhost/tennis_mgmt`).then(()=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
    console.log(err);
});