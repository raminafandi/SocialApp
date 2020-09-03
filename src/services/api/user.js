import firebase from '../firebase/index'
import { Alert } from 'react-native'
const db = firebase.firestore();
const createUser = (email, password, userName, fullName) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
            user.updateProfile({
                displayName: userName,
                photoURL:
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            });
            db.collection('users')
                .doc(user.uid)
                .set({
                    fullName: fullName,
                    status: '',
                    city: '',
                    link: '',
                    gender: '',
                    additionalInfo: '',
                    private: false,
                    friends: 0,
                    subs: 0,
                    saved: {
                        items: [],
                        packs: [],
                    },
                });
            console.log('User account created & signed in!');
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert(
                    'Wrong Credentials',
                    'That email address is already in use!'
                );
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Wrong Credentials', 'That email address is invalid!');
            } else {
                Alert.alert('Wrong Credentials', error);
            }
            console.log(error)

        });
}

const loginUser = (email, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((cred) => console.log('display-name', cred.user.displayName))
        .catch((err) => {
            Alert.alert('Wrong Credentials', 'Login Credentials are not valid');
        });
}


const logoutUser = () => {
    return firebase
        .auth()
        .signOut()
        .then(() => {
            console.log('User signed out!');
        });
}

const getUserInfo = async (user) => {
    return await db.collection('users').doc(user.uid).get()
}

const updateUserInfo = async (user, { name, photoURL, userName, status, city, link, description, email, phone, gender }) => {
    await user.updateProfile({
        displayName: userName,
        photoURL: photoURL,
        email: email,
        phoneNumber: phone
    })
    return await db.collection('users').doc(user.uid).set({
        fullName: name,
        status: status,
        city: city,
        link: link,
        gender: gender,
        additionalInfo: description,
    }, { merge: true })
}

export { createUser, loginUser, logoutUser, getUserInfo, updateUserInfo }