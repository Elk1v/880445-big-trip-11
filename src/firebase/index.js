import firebase from 'firebase';

const firebaseConfig = {
  apiKey: `AIzaSyAVlEeCWs7dStR34U2tJpu8oaGtEI9EOMQ`,
  authDomain: `big-trip-46a01.firebaseapp.com`,
  projectId: `big-trip-46a01`,
  storageBucket: `big-trip-46a01.appspot.com`,
  messagingSenderId: `168078639496`,
  appId: `1:168078639496:web:df1994833eea423c3cba3d`,
  measurementId: `G-G8JMTRM9WT`
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);


