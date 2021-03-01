import firebase from '../firebase/index';
import libFirebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { firestore } from 'firebase';
import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as Facebook from 'expo-facebook';

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
      throw error;
    });
};

const loginUser = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      registerForPushNotificationsAsync();
    })
    .catch((err) => {
      Alert.alert('Wrong Credentials', 'Login Credentials are not valid');
      throw err;
    });
};

const facebookSignIn = async () => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    '326392205351093',
    {
      permissions: ['public_profile'],
    }
  );
  if (type === 'success') {
    const credential = libFirebase.auth.FacebookAuthProvider.credential(token);
    firebase
      .auth()
      .signInWithCredential(credential)
      .catch((error) => {
        console.log(error);
      });
  }
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
const isPrivateUser = (userId = firebase.auth().currentUser.uid) => {
  return db.collection('users').doc(userId).get().then(doc => doc.data().private)
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
  return new Promise((res, rej) => {
    rej('You cant subscribe to yourself ');
  });
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

const makePrivate = () => {
  let currentUser = firebase.auth().currentUser;
  return db.collection('users').doc(currentUser.uid).update({
    private: true
  })
};

const makePublic = () => {
  let currentUser = firebase.auth().currentUser;
  return db.collection('users').doc(currentUser.uid).update({
    private: false
  })
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
    .catch(console.error);
};

const bookmark = (id, data, item) => {
  const currentUser = firebase.auth().currentUser;
  const bookmartData = {
    id,
    data,
    item: item ? true : false,
  };
  return db
    .collection('users')
    .doc(currentUser.uid)
    .update({
      saved: firestore.FieldValue.arrayUnion(bookmartData),
    })
    .catch(console.log);
};
const getUserSubs = (userId = firebase.auth().currentUser.uid) => {
  return getUserInfo(userId).then((doc) => {
    const promises = [];
    doc.data().subs.forEach((subId) => {
      promises.push(getUserInfo(subId));
    });
    return Promise.all(promises);
  });
};
const getUserFriends = (userId = firebase.auth().currentUser.uid) => {
  const promises = [];
  return getUserInfo(userId).then((doc) => {
    doc.data().friends.forEach((subId) => {
      promises.push(getUserInfo(subId));
    });
    return Promise.all(promises);
  });
};

const unmark = (id, data, item) => {
  const currentUser = firebase.auth().currentUser;
  const bookmartData = {
    id,
    data,
    item: item ? true : false,
  };
  return db
    .collection('users')
    .doc(currentUser.uid)
    .update({
      saved: firestore.FieldValue.arrayRemove(bookmartData),
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
  getUserSubs,
  getUserFriends,
  addItemIdToProfile,
  addLookIdToProfile,
  sendSubscribeRequestToPrivateUser,
  getSubRequestForPrivateUser,
  confirmSubRequestForPrivateUser,
  deleteSubRequestForPrivateUser,
  isPrivateUser,
  makePrivate,
  makePublic,
  facebookSignIn,
};
