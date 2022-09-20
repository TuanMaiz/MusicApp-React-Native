// Import the functions you need from the SDKs you need
import * as firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBjxc4DPH0f9jA-Nu52_xUb9fpupx1xbG8",
    authDomain: "musique-4bcd8.firebaseapp.com",
    databaseURL: "https://musique-4bcd8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "musique-4bcd8",
    storageBucket: "musique-4bcd8.appspot.com",
    messagingSenderId: "271244205461",
    appId: "1:271244205461:web:a27cbf4b63c36e6dacaa9c",
    measurementId: "G-GJH32EPW7J"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;