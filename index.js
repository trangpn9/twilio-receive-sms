"use strict";
// import lib / third party / create global variable
const express = require("express");
const cors = require("cors");
const favicon = require('serve-favicon');
const path = require('path');
const morgan = require("morgan");

const bodyParser = require("body-parser");
const config = require("./config");
const smsRouters = require("./routers/sms");

const app = express();
app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));
const port = config.port || 3600;

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import routers api
app.use("/api", smsRouters.routers);

// listen app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
