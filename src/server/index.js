const express = require("express");
const app = express();

const port = process.env.PORT || 8000;
require('./middlewares/appMiddlewares')(app);
const api = require('./routes.js');
const db = require('./middlewares/dbConnection');
app.use('/api/',api);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

