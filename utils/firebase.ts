import * as firebase from "firebase";
import Constants from "expo-constants";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.manifest.extra.FIREBASE_API_KEY,
  authDomain: Constants.manifest.extra.FIREBASE_AUTH_DOMAIN,
  databaseURL: Constants.manifest.extra.FIREBASE_DATABASE_URL,
  projectId: Constants.manifest.extra.FIREBASE_PROJECT_ID,
  storageBucket: Constants.manifest.extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.manifest.extra.FIREBASE_MESSAGING_SENDERID_ID,
  appId: Constants.manifest.extra.FIREBASE_APP_ID,
};

console.log(firebaseConfig);
firebase.initializeApp(firebaseConfig);
