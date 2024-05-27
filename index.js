/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
require("dotenv").config({
  path: "./.env",
});
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./Routes/auth");
const { headersVerify, authVerify } = require("./Middleware/headerMiddleware");
const app = express();

app.use(express.json());
app.use(cors());

app.use(headersVerify);
app.use(authVerify);
app.use("/auth", authRoutes);
app.get("/board", (req, res) => {
  res.send("Hello, World!").status(200);
});

exports.api = functions.https.onRequest(app);
