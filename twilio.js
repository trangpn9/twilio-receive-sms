const config = require("./config");

// config twilio
const accountSid = config.accountSid;
const authToken = config.authToken;
const client = require("twilio")(accountSid, authToken);

module.exports = client;
