require('mongoose').connect(`mongodb://localhost/tennis_mgmt`).then(()=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
    console.log(err);
});