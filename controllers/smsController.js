"use strict";
const app = require("../firebase");
const {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} = require("firebase/firestore");
const client = require("../twilio");

const db = getFirestore(app);

// service receive SMS
const receiveSMS = async (req, res, next) => {
  try {
    const msgBody = req.body.Body;
    console.log("Body: ", msgBody);
    // conconst otp = Math.floor(100000 + Math.random() * 900000);
    const userRef = doc(db, "users", "+84983264835");
    const data = {
      phoneNumber: "+84983264835",
      accessCode: msgBody,
      favoriteGithubUsers: [],
    };

    // check user exits before add new user
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await updateDoc(userRef, {
        accessCode: msgBody,
      });
      // res.status(200).send(`Record saved successfuly! AccessCode: ${otp}`);
    } else {
      await setDoc(userRef, data);
      // res.status(200).send(`Record saved successfuly! AccessCode: ${otp}`);
    }

    // send opt via twilio
    client.messages
      .create({
        body: `Jackie Trang: ${msgBody.toString()}`,
        from: "+13613145274",
        to: "+84983264835",
      })
      .then((messages) => console.log(messages))
      .catch((err) => console.error(err));

    res.status(200).json({
      code: "2200",
      message: "Receive SMS!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const sendSMS = async (req, res, next) => {
  try {
    // send opt via twilio
    client.messages
      .create({
        body: `Jackie Trang 1`,
        from: "+13613145274",
        to: "+15877054890",
      })
      .then((messages) => console.log(messages))
      .catch((err) => console.error(err));

    res.status(200).json({
      code: "2200",
      message: "Send SMS done!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  receiveSMS, sendSMS
};
