import firebase from '../firebase/index'
const db = firebase.firestore();
import { uploadImage } from './image'
const getUserItems = () => {
    return db.collection('items').where("info.userId", "==", firebase.auth().currentUser.uid).get()
}

const addItem = async ({ img, name, brand, description, price }) => {
    uploadImage(img, 'itemImages/')
        .then((url) => {
            const currentUser = firebase.auth().currentUser;
            return db.collection('items').add({
                name: name,
                brand: brand,
                image: url,
                info: {
                    description: description,
                    price: price,
                    userId: currentUser.uid,
                    userName: currentUser.displayName
                },
                tags: [],
                url: ''
            });
        })
}


const getItemById = (id) => {
    return db.collection('items').doc(id).get();
}

export { getUserItems, addItem, getItemById }