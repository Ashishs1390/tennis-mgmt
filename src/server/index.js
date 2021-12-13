const express = require("express");
const app = express();
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8000;
console.log(process.env.PORT);

require('./middlewares/appMiddlewares')(app);
const api = require('./routes.js');
const db = require('./middlewares/dbConnection');
app.use('/api/',api);

console.log(process.env.ONESERVER,"------------------")
if(process.env.ONESERVER === "true"){
    app.use(
        express.static(path.join(__dirname, "../../dist"),{maxage:"2h"})
    );

    app.use("*",(req,res)=>{
        res.sendfile(path.join(__dirname,"../../dist/index.html"));
    });
    // process.env.PORT = 8000;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

