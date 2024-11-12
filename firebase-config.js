// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyBG8cE2gf2e4ETaLZHrT_Rs1zBMDZtT_pk",
    authDomain: "moo-moo-money.firebaseapp.com",
    projectId: "moo-moo-money",
    storageBucket: "moo-moo-money.firebasestorage.app",
    messagingSenderId: "319129905603",
    appId: "1:319129905603:web:5c222477db726c20933576"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const coinsRef = db.ref("coins");
