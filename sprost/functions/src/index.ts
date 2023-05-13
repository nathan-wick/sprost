import {onCall} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";

initializeApp();

exports.logMessage = onCall((request) => {
  const {message} = request.data;
  console.log(message);
});
