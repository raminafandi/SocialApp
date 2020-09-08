import firebase from '../firebase/index'
const db = firebase.firestore();
const currentUser = firebase.auth().currentUser;
import { uploadImage } from './image'
const addLook = ({ images, description, tags, coverImage }) => {
    return uploadImage(coverImage).then(coverImageUrl => {
        return db.collection('packs').add({
            images: images,
            description: description,
            tags: tags,
            coverImage: coverImageUrl,
            author: {
                id: currentUser.uid,
                userName: currentUser.displayName,
                photo: currentUser.photoURL
            }
        })
    })
}

export { addLook }