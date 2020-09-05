import firebase from '../firebase/index'
const db = firebase.firestore();

const getAlbums = () => db.collection('albums').get();
const getItemsOfAlbum = (id) => db.collection('albums').doc(id).get();

export { getItemsOfAlbum, getAlbums }