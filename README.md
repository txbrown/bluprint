# Bluprint

Bluprint is a React-Native (Expo) starter project with:

- Login with auth0
- Data storage with firebase
- Content management with Contentful

## Requirements

- Contentful account and a space
- Firebase account and a project set-up
- Auth0

## Environment variables

Create a `.env` file in the root of the project. Then make sure it looks something like this by adding your own values:

```
#auth0
AUTH0_CLIENT_ID=<value>
AUTH0_DOMAIN=<value>

# contentful
CONTENTFUL_SPACE_ID =<value>
CONTENTFUL_CDA_TOKEN=<value>
CONTENTFUL_API_BASE_URL=<value>


# Firebase
FIREBASE_API_KEY=<value>
FIREBASE_AUTH_DOMAIN=<value>
FIREBASE_DATABASE_URL=<value>
FIREBASE_PROJECT_ID=<value>
FIREBASE_STORAGE_BUCKET=<value>
FIREBASE_MESSAGING_SENDERID_ID=<value>
FIREBASE_APP_ID=1=<value>
```
