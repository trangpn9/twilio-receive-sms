const express = require("express");
const {
  receiveSMS, sendSMS
} = require("../controllers/smsController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Express App receive SMS via Twilio!");
});

router.post("/receive-sms", receiveSMS);
router.post("/send-sms", sendSMS);

module.exports = { routers: router };
