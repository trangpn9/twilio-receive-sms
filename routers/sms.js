const express = require("express");
const {
  receiveSMS
} = require("../controllers/smsController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Express App receive SMS via Twilio!");
});

router.post("/sms", receiveSMS);

module.exports = { routers: router };
