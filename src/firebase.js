import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDKmIQ5qtF9UUD1bAkLCaGjwugxU2amlvs",
  authDomain: "netflix-clone-build-23903.firebaseapp.com",
  projectId: "netflix-clone-build-23903",
  storageBucket: "netflix-clone-build-23903.appspot.com",
  messagingSenderId: "470096558445",
  appId: "1:470096558445:web:8fdb61c5693f1ade1b8264"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;