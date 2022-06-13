const express = require("express");
const app = express();
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT ||  8000;
require('./middlewares/appMiddlewares')(app);
const api = require('./routes.js');
const db = require('./middlewares/dbConnection');
console.log("-----------index---------------");
console.log(process.env.NODE_ENV);
app.use('/api/',api);
// app.get("/healthcheck",(req,res)=>{
//     console.log("aaaa")
//     res.status(200).send({msg:"user exist",status:200});
// });

if(process.env.ONESERVER === "true"){
    app.use(
        express.static(path.join(__dirname, "../../dist"),{maxage:"2h"})
    );

    app.use("*",(req,res)=>{
        res.sendfile(path.join(__dirname,"../../dist/index.html"));
    });
    process.env.PORT = 8000;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

