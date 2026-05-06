const admin = require("firebase-admin");
const serviceAccount = require("../storage/app/firebase/firebase_credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;