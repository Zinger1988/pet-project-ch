/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const dotenv = require("dotenv");
const {RtcTokenBuilder, RtcRole, RtmTokenBuilder} = require("agora-token");

dotenv.config();

exports.generateToken = functions.https.onCall(async (data, context) => {
  const appId = process.env.APP_ID;
  const appCertificate = process.env.APP_CERTIFICATE;
  const channelName = data.channelName;
  const uid = data.uid || 0;
  const role = RtcRole.PUBLISHER;

  const expirationTimeInSeconds = data.expiryTime;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  if (channelName === undefined || channelName === null) {
    throw new functions.https.HttpsError("aborted", "Channel name is required");
  }

  try {
    const token = RtcTokenBuilder.buildTokenWithUid(
        appId,
        appCertificate,
        channelName,
        uid,
        role,
        privilegeExpiredTs,
    );
    return token;
  } catch (err) {
    throw new functions.https.HttpsError("aborted", "Could not generate token");
  }
});

exports.generateRTMToken = functions.https.onCall(async (data, context) => {
  const appId = process.env.APP_ID;
  const appCertificate = process.env.APP_CERTIFICATE;
  const uid = data.uid || 0;

  const expirationTimeInSeconds = data.expiryTime;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  try {
    const token = RtmTokenBuilder.buildToken(
        appId,
        appCertificate,
        uid,
        privilegeExpiredTs,
    );
    return token;
  } catch (err) {
    throw new functions.https.HttpsError("aborted", "Could not generate token");
  }
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
