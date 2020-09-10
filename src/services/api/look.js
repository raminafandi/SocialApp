import firebase from '../firebase/index';
import 'firebase/firestore';
const db = firebase.firestore();
import { uploadImage } from './image';
import { firestore } from 'firebase';
import { Alert } from 'react-native';
const collectionName = 'packs';
const addLook = ({ images, description, tags, coverImage }) => {
  const currentUser = firebase.auth().currentUser;
  let date = new Date();
  date =
    date.getUTCFullYear() +
    '-' +
    ('00' + (date.getUTCMonth() + 1)).slice(-2) +
    '-' +
    ('00' + date.getUTCDate()).slice(-2) +
    ' ' +
    ('00' + date.getUTCHours()).slice(-2) +
    ':' +
    ('00' + date.getUTCMinutes()).slice(-2) +
    ':' +
    ('00' + date.getUTCSeconds()).slice(-2);
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
      date: date,
      likes: [],
      comments: [],
    })
  );
};

const getUserLooks = (userId) => {
  return db
    .collection('packs')
    .where('author.id', '==', userId)
    .get();
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
  return db.collection(collectionName).get();
};

export { addLook, getLooksForHomeScreen, likeLook, getUserLooks, dislikeLook };
