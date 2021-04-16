import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyAzcWaLzbYHKwAjU0r1qWFh-gI4jZ9JwUA",
  authDomain: "fit-track-309615.firebaseapp.com",
  projectId: "fit-track-309615",
  storageBucket: "fit-track-309615.appspot.com",
  messagingSenderId: "134263371115",
  appId: "1:134263371115:web:2027590cf28e05f4a4882e",
  measurementId: "G-QQ682R0MWD"
});


export const auth = app.auth()
export default app