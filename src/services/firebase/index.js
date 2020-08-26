import * as Firebase from 'firebase';
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

const firebase = Firebase.initializeApp(firebaseConfig);
export default firebase;