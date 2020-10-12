import { config } from "dotenv";
config();

export default {
  name: "Bluprint",
  version: "0.0.1",

  extra: {
    // auth0
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    // contentful
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_CDA_TOKEN: process.env.CONTENTFUL_CDA_TOKEN,
    CONTENTFUL_API_BASE_URL: process.env.CONTENTFUL_API_BASE_URL,
    // Firebase
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDERID_ID: process.env.FIREBASE_MESSAGING_SENDERID_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
};
