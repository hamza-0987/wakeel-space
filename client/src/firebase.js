import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD_hH4UrDf4943HCXBBXxIr04F7HCTw9Tk",
    authDomain: "learnerspace-6a731.firebaseapp.com",
    projectId: "learnerspace-6a731",
    storageBucket: "learnerspace-6a731.appspot.com",
    messagingSenderId: "614755977474",
    appId: "1:614755977474:web:48987dc24e9d74d7e5da1b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export default db;