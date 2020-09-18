import * as firebase from 'firebase';
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBBrdxfvO3khmOe67mq7FQ0wrVjOsJRfrE",
    authDomain: "looks-f90da.firebaseapp.com",
    databaseURL: "https://looks-f90da.firebaseio.com",
    projectId: "looks-f90da",
    storageBucket: "looks-f90da.appspot.com",
    messagingSenderId: "337497640410",
    appId: "1:337497640410:web:29b3486646ff5d644bc4e3",
    measurementId: "G-RFV1KWFJ7C"
};

const paidFirebaseConfig = {
    apiKey: "AIzaSyCqq4kKHklEWWhKAfUW6mTX0S1F9pKvWD8",
    authDomain: "looks-5f516.firebaseapp.com",
    databaseURL: "https://looks-5f516.firebaseio.com",
    projectId: "looks-5f516",
    storageBucket: "looks-5f516.appspot.com",
    messagingSenderId: "556161865767",
    appId: "1:556161865767:web:c01c02186985c71bd4d602",
    measurementId: "G-XNX116PFTK"
};

const fb = firebase.initializeApp(firebaseConfig);
export default fb;