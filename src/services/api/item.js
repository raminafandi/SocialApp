import firebase from '../firebase/index';
const db = firebase.firestore();
import { uploadImage } from './image';
import { addItemIdToProfile, getUserInfo } from './user'
const collectionName = 'items';

const addItem = async ({ img, name, brand, description, price, tags, gender }) => {
    return uploadImage(img, 'itemImages/')
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
                tags: tags,
                url: '',
                date: new Date(),
                gender: gender,
            }).then(doc => addItemIdToProfile(doc.id)).catch(err => console.error('item add error', err));
        })
}


const getUserItems = (userId = firebase.auth().currentUser.uid) => {
    return getUserInfo(userId).then(doc => {
        const promises = [];
        doc.data().items.forEach(itemId => {
            promises.push(getItemById(itemId))
        })
        return Promise.all(promises)
    }
    )
};

const getItemById = (id) => {
    return db.collection('items').doc(id).get().then(doc => ({id: doc.id, ...doc.data()}));
};

export { getUserItems, addItem, getItemById };
