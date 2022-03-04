import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyBCbApwFHTf2-DR8mMP2hgsBofzB-KjD1Y",
    authDomain: "whatsapp-clone-5d3e9.firebaseapp.com",
    projectId: "whatsapp-clone-5d3e9",
    storageBucket: "whatsapp-clone-5d3e9.appspot.com",
    messagingSenderId: "892808680339",
    appId: "1:892808680339:web:fff1aa6aba1b6a1d2e0e66",
    measurementId: "G-87H154061C"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;
