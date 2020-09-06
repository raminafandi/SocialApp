import firebase from '../firebase/index'
const db = firebase.firestore();
const currentUser = firebase.auth().currentUser;
const addLook = ({ images, description, tags, coverImage }) => {
    db.collection('looks').add({
        images: images,
        description: description,
        tags: tags,
        coverImage: coverImage,
        author: {
            id: currentUser.uid,
            userName: currentUser.displayName,
            photo: currentUser.photoURL
        }
    })
}

export { addLook }