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
    const reqBody = req.body;
    // const otp = Math.floor(100000 + Math.random() * 900000);
    const userRef = doc(db, "users", "+84983264835");
    const data = {
      phoneNumber: "+84983264835",
      accessCode: reqBody,
      favoriteGithubUsers: [],
    };

    // check user exits before add new user
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await updateDoc(userRef, {
        accessCode: reqBody,
      });
      // res.status(200).send(`Record saved successfuly! AccessCode: ${otp}`);
    } else {
      await setDoc(userRef, data);
      // res.status(200).send(`Record saved successfuly! AccessCode: ${otp}`);
    }

    // send opt via twilio
    client.messages
      .create({
        body: `SKIPLI app - Your Access Code: ${reqBody}`,
        from: "+12624255115",
        to: "+84983264835",
      })
      .then((messages) => console.log(messages))
      .catch((err) => console.error(err));

    res.status(200).json({
      code: "2200",
      message: "Validate successfuly!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  receiveSMS,
};
