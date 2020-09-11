import firebase from '../firebase/index'
import 'firebase/firestore';
import { firestore } from 'firebase';
import { getDate } from './helper'
const db = firestore();

const addComment = ({ postId, comment }) => {
    const currentUser = firebase.auth().currentUser;
    return db.collection('comments').add({
        postId: postId,
        body: comment,
        author: {
            id: currentUser.uid,
            userName: currentUser.displayName,
            photo: currentUser.photoURL,
        },
        date: getDate(),
        likes: [],
    })
}

const getComments = (lookId) => {
    return db.collection('comments').where('postId', "==", lookId).get()
}
const likeComment = (commentId) => {
    const currentUser = firebase.auth().currentUser;
    return db
        .collection('comments')
        .doc(commentId)
        .update({
            likes: firestore.FieldValue.arrayUnion(currentUser.uid),
        })
        .catch((err) => console.error(err));
}
const dislikeComment = (commentId) => {
    const currentUser = firebase.auth().currentUser;
    return db
        .collection('comments')
        .doc(commentId)
        .update({
            likes: firestore.FieldValue.arrayRemove(currentUser.uid),
        })
        .catch((err) => console.error(err));
}
export { addComment, getComments, likeComment, dislikeComment }