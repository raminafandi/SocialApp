import firebase from '../firebase/index';
const db = firebase.firestore();
import { uploadImage } from './image';
const getUserItems = () => {
  return db
    .collection('items')
    .where('info.userId', '==', firebase.auth().currentUser.uid)
    .get();
};

const addItem = async ({ img, name, brand, description, price, tags, gender }) => {
    uploadImage(img, 'itemImages/')
        .then((url) => {
            const currentUser = firebase.auth().currentUser;
            let date = new Date();
            date = date.getUTCFullYear() + '-' +
                ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
                ('00' + date.getUTCDate()).slice(-2) + ' ' +
                ('00' + date.getUTCHours()).slice(-2) + ':' +
                ('00' + date.getUTCMinutes()).slice(-2) + ':' +
                ('00' + date.getUTCSeconds()).slice(-2);
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
                date: date,
                gender: gender,
            }).catch(err => console.error('item add error', err));
        })
}


const getItemById = (id) => {
  return db.collection('items').doc(id).get();
};

export { getUserItems, addItem, getItemById };
