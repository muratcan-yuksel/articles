-create a database in firestore

- install firebase => npm install firebase
  -create a firebase.js or initFirebase.js file in src folder

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
apiKey: "AIzaSyCCp-qwLGq9MugKd0g3rzLJBiL2bRW-tmY",
authDomain: "chat-app-11b84.firebaseapp.com",
databaseURL:
"https://chat-app-11b84-default-rtdb.europe-west1.firebasedatabase.app",
projectId: "chat-app-11b84",
storageBucket: "chat-app-11b84.appspot.com",
messagingSenderId: "561002742526",
appId: "1:561002742526:web:1ea255108f7778f356dbaf",
measurementId: "G-T5Y24K7FG6",
};

function initFirebase() {
if (!firebase.apps.length) {
firebase.initializeApp(config);
}
}
initFirebase();

export { firebase };
