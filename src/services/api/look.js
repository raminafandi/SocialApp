import firebase from '../firebase/index'
const db = firebase.firestore();
const currentUser = firebase.auth().currentUser;
import { uploadImage } from './image'
const addLook = ({ images, description, tags, coverImage }) => {
    let date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
    return (coverImage ? uploadImage(coverImage) : new Promise((res) => res(''))).then(coverImageUrl => db.collection('packs').add({
        images: images,
        description: description,
        tags: tags,
        coverImage: coverImageUrl,
        author: {
            id: currentUser.uid,
            userName: currentUser.displayName,
            photo: currentUser.photoURL
        },
        date: date
    })
    )
}

export { addLook }