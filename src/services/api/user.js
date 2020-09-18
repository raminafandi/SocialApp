import firebase from '../firebase/index';
import 'firebase/firestore';
import { firestore } from 'firebase';
import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

const db = firebase.firestore();
const registerForPushNotificationsAsync = async () => {
  const currentUser = firebase.auth().currentUser;

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus != 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    return;
  }
  let token = await Notifications.getExpoPushTokenAsync();
  db.collection('users').doc(currentUser.uid).update({ expoToken: token });
};
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
      db.collection('users').doc(user.uid).set({
        fullName: fullName,
        userName: userName,
        photoURL:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        status: '',
        city: '',
        link: '',
        gender: '',
        additionalInfo: '',
        private: false,
        friends: [],
        subs: [],
        saved: [],
        looks: [],
        items: [],
        date: new Date(),
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
      console.log(error);
    });
};

const loginUser = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((cred) => console.log('display-name', cred.user.displayName))
    .then(() => {
      registerForPushNotificationsAsync();
    })
    .catch((err) => {
      Alert.alert('Wrong Credentials', 'Login Credentials are not valid');
    });
};

const addLookIdToProfile = (lookId) => {
  const currentUser = firebase.auth().currentUser;
  return db
    .collection('users')
    .doc(currentUser.uid)
    .update({
      looks: firestore.FieldValue.arrayUnion(lookId),
    });
};

const addItemIdToProfile = (itemId) => {
  const currentUser = firebase.auth().currentUser;
  return db
    .collection('users')
    .doc(currentUser.uid)
    .update({
      items: firestore.FieldValue.arrayUnion(itemId),
    });
};

const logoutUser = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
    })
    .catch(console.log);
};

const getUserInfo = (userId = firebase.auth().currentUser.uid) => {
  return db.collection('users').doc(userId).get().catch(console.log);
};

const sendSubscribeRequestToPrivateUser = (userId) => {
  const currentUser = firebase.auth().currentUser;
  return db
    .collection('users')
    .doc(userId)
    .update({
      subRequests: firestore.FieldValue.arrayUnion(currentUser.uid),
    });
};

const getSubRequestForPrivateUser = (
  userId = firebase.auth().currentUser.uid
) => {
  return getUserInfo(userId).then((doc) => {
    return doc.data().subRequests;
  });
};

const confirmSubRequestForPrivateUser = (userId) => {
  const currentUser = firebase.auth().currentUser;
  return Promise.all([
    //delete from subRequests
    db
      .collection('users')
      .doc(currentUser.uid)
      .update({
        subRequests: firestore.FieldValue.arrayRemove(userId),
      }),
    db
      .collection('users')
      .doc(currentUser.uid)
      .update({
        subs: firestore.FieldValue.arrayUnion(userId),
      }),
    db
      .collection('users')
      .doc(userId)
      .update({
        friends: firestore.FieldValue.arrayUnion(currentUser.uid),
      }),
  ]);
};

const deleteSubRequestForPrivateUser = (userId) => {
  const currentUser = firebase.auth().currentUser;
  return Promise.all([
    //delete from subRequests
    db
      .collection('users')
      .doc(currentUser.uid)
      .update({
        subRequests: firestore.FieldValue.arrayRemove(userId),
      }),
  ]);
};
const isPrivateUser = () => {
  return firebase.auth().currentUser.private;
};
const subscribeToUser = (userId) => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser.uid !== userId) {
    return Promise.all([
      db
        .collection('users')
        .doc(userId)
        .update({
          subs: firestore.FieldValue.arrayUnion(currentUser.uid),
        }),
      db
        .collection('users')
        .doc(currentUser.uid)
        .update({
          friends: firestore.FieldValue.arrayUnion(userId),
        }),
    ]);
  }
};

const unsubscribeFromUser = (userId) => {
  const currentUser = firebase.auth().currentUser;
  return Promise.all([
    db
      .collection('users')
      .doc(userId)
      .update({
        subs: firestore.FieldValue.arrayRemove(currentUser.uid),
      }),
    db
      .collection('users')
      .doc(currentUser.uid)
      .update({
        friends: firestore.FieldValue.arrayRemove(userId),
      }),
  ]);
};
const updateUserInfo = async (
  user,
  {
    name,
    photoURL,
    userName,
    status,
    city,
    link,
    description,
    email,
    phone,
    gender,
  }
) => {
  await user
    .updateProfile({
      displayName: userName,
      photoURL: photoURL,
      email: email,
      phoneNumber: phone,
    })
    .catch(console.log);
  return await db
    .collection('users')
    .doc(user.uid)
    .set(
      {
        fullName: name,
        status: status,
        city: city,
        link: link,
        gender: gender,
        additionalInfo: description,
      },
      { merge: true }
    )
    .catch(console.log);
};

const bookmark = (id, data) => {
  const currentUser = firebase.auth().currentUser;
  return db
    .collection('users')
    .doc(currentUser.uid)
    .update({
      saved: firestore.FieldValue.arrayUnion({ id, data }),
    })
    .catch(console.log);
};

const unmark = (id, data) => {
  const currentUser = firebase.auth().currentUser;
  return db
    .collection('users')
    .doc(currentUser.uid)
    .update({
      saved: firestore.FieldValue.arrayRemove({ id, data }),
    })
    .catch(console.log);
};

export {
  createUser,
  loginUser,
  logoutUser,
  getUserInfo,
  updateUserInfo,
  subscribeToUser,
  unsubscribeFromUser,
  bookmark,
  unmark,
  addItemIdToProfile,
  addLookIdToProfile,
  sendSubscribeRequestToPrivateUser,
  getSubRequestForPrivateUser,
  confirmSubRequestForPrivateUser,
  deleteSubRequestForPrivateUser,
  isPrivateUser,
};
