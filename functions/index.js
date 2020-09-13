const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;
const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('items');

/// Cloud Functions

exports.addToIndex = functions.firestore
  .document('items/{itemId}')
  .onCreate((snapshot, context) => {
    const data = snapshot.data();
    // Add an 'objectID' field which Algolia requires
    data.objectID = context.params.itemId;
    console.log('data', data);
    return index.saveObject(data);
  });

exports.updateIndex = functions.firestore
  .document('items/{itemId}')
  .onUpdate((change) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.saveObject({ ...newData, objectID });
  });

exports.deleteFromIndex = functions.firestore
  .document('items/{itemId}')
  .onDelete((snapshot) => index.deleteObject(snapshot.id));
