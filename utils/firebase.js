const admin = require("firebase-admin");
const { getAuth } = require("firebase/auth");
const { initializeApp } = require("firebase/app");
const { applicationDefault } = require("firebase-admin/app");

admin.initializeApp({
  credential: applicationDefault(),
});

const firebaseConfig = {
  apiKey: process.env.NODE_ENV_API_KEY,
  authDomain: process.env.NODE_ENV_AUTH_DOMAIN,
  projectId: process.env.NODE_ENV_PROJECT_ID,
  storageBucket: process.env.NODE_ENV_STORAGE_BUCKET,
  messagingSenderId: process.env.NODE_ENV_MESSAGING_SENDER_ID,
  appId: process.env.NODE_ENV_APP_ID,
  measurementId: process.env.NODE_ENV_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

module.exports = { admin, firebaseAuth };
