import firebase from '../firebase/index';
import 'firebase/firestore';
const db = firebase.firestore();
import { uploadImage } from './image';
import { firestore } from 'firebase';
import { Alert } from 'react-native';
import { getDate } from './helper'
import { addLookIdToProfile, getUserInfo } from './user'
const collectionName = 'packs';
const addLook = ({ images, description, tags, coverImage }) => {
  const currentUser = firebase.auth().currentUser;
  return (coverImage
    ? uploadImage(coverImage)
    : new Promise((res) => res(''))
  ).then((coverImageUrl) =>
    db.collection(collectionName).add({
      images: images,
      description: description,
      tags: tags,
      coverImage: coverImageUrl,
      author: {
        id: currentUser.uid,
        userName: currentUser.displayName,
        photo: currentUser.photoURL,
      },
      date: getDate(),
      likes: [],
      comments: [],
    }).then(doc => addLookIdToProfile(doc.id)).catch(console.log)
  ).catch(console.log);
};

const getLookById = (lookId) =>  db.collection(collectionName).doc(lookId).get().then(doc => ({id: doc?.id, ...doc?.data()}))


const getUserLooks = (userId = firebase.auth().currentUser.uid) => {
  return getUserInfo(userId).then(doc => {
    const promises = [];
    doc.data().looks.forEach(lookId => {
      promises.push(getLookById(lookId))
    })
    return Promise.all(promises)
  }
  )
};

const likeLook = (lookId) => {
  const currentUser = firebase.auth().currentUser;
  return db
    .collection(collectionName)
    .doc(lookId)
    .update({
      likes: firestore.FieldValue.arrayUnion(currentUser.uid),
    })
    .catch((err) => console.error(err));
};

const dislikeLook = (lookId) => {
  const currentUser = firebase.auth().currentUser;
  return db
    .collection(collectionName)
    .doc(lookId)
    .update({
      likes: firestore.FieldValue.arrayRemove(currentUser.uid),
    })
    .catch((err) => console.error(err));
};

const getLooksForHomeScreen = () => {
  return db.collection(collectionName).get().catch(console.log);
};

export { addLook, getLooksForHomeScreen, likeLook, getUserLooks, dislikeLook };
