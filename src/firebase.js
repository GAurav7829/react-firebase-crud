import firebase from 'firebase';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyB093KTLY2Ma5LotYmMnTXgxmqyzept_tE",
    authDomain: "frcrud-a1690.firebaseapp.com",
    projectId: "frcrud-a1690",
    storageBucket: "frcrud-a1690.appspot.com",
    messagingSenderId: "993074149183",
    appId: "1:993074149183:web:407f44372af61cc387858a",
    measurementId: "G-L6X20HX4V6"
};

var firebaseObj = firebase.initializeApp(firebaseConfig);

export default firebaseObj;