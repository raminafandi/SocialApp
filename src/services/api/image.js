import firebase from '../firebase/index'
const db = firebase.firestore();

const uploadImage = async (img, path) => {
    const response = await fetch(img);
    const blob = await response.blob();
    const ref =
        firebase
            .storage()
            .ref(path)
            .child(img.split('/').pop());
    return ref.put(blob).then(() => {
        console.log('Image uploaded to the bucket!');
        return ref.getDownloadURL()
    })
}


export { uploadImage }