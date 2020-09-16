import React, { useEffect, useState } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    StyleSheet,
    FlatList
} from 'react-native'
import { window } from '../../entities/constants'
import Post from '../../components/Post'
const { height, width } = window
import firebase from '../../services/firebase/index'
const database = firebase.firestore();
const InfiniteScrollFunc = ({ navigation, userInfo }) => {
    const [documentData, setDocumentData] = useState([])
    const [limit, setLimit] = useState(3)
    const [lastVisible, setLastVisible] = useState(null)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {
        try {
            // Cloud Firestore: Initial Query
            retrieveData();
        }
        catch (error) {
            console.log(error);
        }
    }, [])
    const retrieveData = async () => {
        try {
            // Set State: Loading
            setLoading(true)
            console.log('Retrieving Data');
            // Cloud Firestore: Query
            database.collection('packs')
                .orderBy('date')
                .limit(limit).get().then(snap => {
                    const allData = [];
                    snap.forEach(doc => allData.push({ id: doc.id, ...doc.data() }))
                    return allData
                }).then(allData => {
                    console.log('allData', allData)
                    setDocumentData(allData)
                    setLastVisible(allData[allData.length - 1].id)
                    setLoading(false)
                })

            // let initialQuery = await database.collection('looks')
            //     .where('id', '<=', 20)
            //     .orderBy('id')
            //     .limit(limit)
            // // Cloud Firestore: Query Snapshot
            // let documentSnapshots = await initialQuery.get();
            // // Cloud Firestore: Document Data
            // let newDocumentData = documentSnapshots.map(document => document.data());
            // // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
            // let newLastVisible = newDocumentData[newDocumentData.length - 1].id;
            // // Set State
            // setDocumentData(newDocumentData)
            // setLastVisible(newLastVisible)
            // setLoading(false)
        }
        catch (error) {
            console.log(error);
        }
    };
    // Retrieve More
    const retrieveMore = async () => {
        try {
            // Set State: Refreshing
            setRefreshing(true)
            console.log('Retrieving additional Data');
            // Cloud Firestore: Query (Additional Query)

            database.collection('packs')
                .orderBy('date')
                .startAfter(lastVisible)
                .limit(limit).get().then(snap => {
                    const allData = [];
                    snap.forEach(doc => allData.push({ id: doc.id, ...doc.data() }))
                    return allData
                }).then(allData => {
                    setDocumentData([...documentData, ...allData])
                    setLastVisible(allData[allData.length - 1].id)
                    setLoading(false)
                })

            // let additionalQuery = await database.collection('looks')
            //     .where('id', '<=', 20)
            //     .orderBy('id')
            //     .startAfter(lastVisible)
            //     .limit(limit)
            // // Cloud Firestore: Query Snapshot
            // let documentSnapshots = await additionalQuery.get();
            // // Cloud Firestore: Document Data
            // let newDocumentData = documentSnapshots.map(document => document.data());
            // console.log('newDoc', newDocumentData)
            // // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
            // let newLastVisible = newDocumentData[newDocumentData.length - 1].id;
            // // Set State
            // setDocumentData([...documentData, ...newDocumentData])
            // setLastVisible(newLastVisible)
            // setRefreshing(false)
        }
        catch (error) {
            console.log(error);
        }
    };
    // Render Footer
    const renderFooter = () => {
        try {
            // Check If Loading
            if (loading) {
                return (
                    <ActivityIndicator />
                )
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    return (
        <FlatList
            // Data
            data={documentData}
            // Render Items
            renderItem={({ item }) => (
                <Post look={item} navigation={navigation} userInfo={userInfo} />
            )}
            // Item Key
            keyExtractor={(item, index) => String(index)}
            // Header (Title)
            // ListHeaderComponent={this.renderHeader}
            // Footer (Activity Indicator)
            ListFooterComponent={renderFooter}
            // On End Reached (Takes a function)
            onEndReached={retrieveMore}
            // How Close To The End Of List Until Next Data Request Is Made
            onEndReachedThreshold={0}
            // Refreshing (Set To True When End Reached)
            refreshing={refreshing}
        />
    )

}

export default InfiniteScrollFunc
// export default class InfiniteScroll extends React.Component {
//     constructor(props) {
//         this.state = {
//             documentData: [],
//             limit: 5,
//             lastVisible: null,
//             loading: false,
//             refreshing: false,
//         };
//     }
//     // Component Did Mount
//     componentDidMount = () => {
//         try {
//             // Cloud Firestore: Initial Query
//             this.retrieveData();
//         }
//         catch (error) {
//             console.log(error);
//         }
//     };
//     // Retrieve Data
//     retrieveData = async () => {
//         try {
//             // Set State: Loading
//             this.setState({
//                 loading: true,
//             });
//             console.log('Retrieving Data');
//             // Cloud Firestore: Query
//             let initialQuery = await database.scollection('looks')
//                 .where('id', '<=', 20)
//                 .orderBy('id')
//                 .limit(this.state.limit)
//             // Cloud Firestore: Query Snapshot
//             let documentSnapshots = await initialQuery.get();
//             // Cloud Firestore: Document Data
//             let documentData = documentSnapshots.docs.map(document => document.data());
//             // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
//             let lastVisible = documentData[documentData.length - 1].id;
//             // Set State
//             this.setState({
//                 documentData: documentData,
//                 lastVisible: lastVisible,
//                 loading: false,
//             });
//         }
//         catch (error) {
//             console.log(error);
//         }
//     };
//     // Retrieve More
//     retrieveMore = async () => {
//         try {
//             // Set State: Refreshing
//             this.setState({
//                 refreshing: true,
//             });
//             console.log('Retrieving additional Data');
//             // Cloud Firestore: Query (Additional Query)
//             let additionalQuery = await database.collection('looks')
//                 .where('id', '<=', 20)
//                 .orderBy('id')
//                 .startAfter(this.state.lastVisible)
//                 .limit(this.state.limit)
//             // Cloud Firestore: Query Snapshot
//             let documentSnapshots = await additionalQuery.get();
//             // Cloud Firestore: Document Data
//             let documentData = documentSnapshots.docs.map(document => document.data());
//             // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
//             let lastVisible = documentData[documentData.length - 1].id;
//             // Set State
//             this.setState({
//                 documentData: [...this.state.documentData, ...documentData],
//                 lastVisible: lastVisible,
//                 refreshing: false,
//             });
//         }
//         catch (error) {
//             console.log(error);
//         }
//     };
//     // Render Header
//     renderHeader = () => {
//         try {
//             return (
//                 <Text style={styles.headerText}>Items</Text>
//             )
//         }
//         catch (error) {
//             console.log(error);
//         }
//     };
//     // Render Footer
//     renderFooter = () => {
//         try {
//             // Check If Loading
//             if (this.state.loading) {
//                 return (
//                     <ActivityIndicator />
//                 )
//             }
//             else {
//                 return null;
//             }
//         }
//         catch (error) {
//             console.log(error);
//         }
//     };
//     render() {
//         return (
//             <FlatList
//                 // Data
//                 data={this.state.documentData}
//                 // Render Items
//                 renderItem={({ item }) => (
//                     <Post look={item} navigation={this.props.navigation} userInfo={this.props.userInfo} />
//                 )}
//                 // Item Key
//                 keyExtractor={(item, index) => String(index)}
//                 // Header (Title)
//                 // ListHeaderComponent={this.renderHeader}
//                 // Footer (Activity Indicator)
//                 ListFooterComponent={this.renderFooter}
//                 // On End Reached (Takes a function)
//                 onEndReached={this.retrieveMore}
//                 // How Close To The End Of List Until Next Data Request Is Made
//                 onEndReachedThreshold={0}
//                 // Refreshing (Set To True When End Reached)
//                 refreshing={this.state.refreshing}
//             />
//         )
//     }
// }
