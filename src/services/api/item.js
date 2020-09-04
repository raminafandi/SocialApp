import firebase from '../firebase/index'
const db = firebase.firestore();

const getUserItems = () => {
    return db.collection('items').where("info.userId", "==", firebase.auth().currentUser.uid).get()
}

const addItem = async ({ img, name,  brand, description, price}) => {
    const response = await fetch(img);
    const blob = await response.blob();
    const ref =
        firebase
            .storage()
            .ref('itemImages/')
            .child(img.split('/').pop());
    return ref.put(blob).then(() => {
        console.log('Image uploaded to the bucket!');
        return ref.getDownloadURL()
    })
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

export { getUserItems, addItem }