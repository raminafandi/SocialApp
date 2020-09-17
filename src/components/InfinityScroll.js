import React, { useEffect, useState } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    StyleSheet,
    FlatList,
    Platform
} from 'react-native'
import { window } from '../entities/constants'
import Post from './Post'
const { height, width } = window
import firebase from '../services/firebase/index'
import LoadingScreen from '../screens/OtherScreens/LoadingScreen'
const database = firebase.firestore();
const InfiniteScrollFunc = ({ navigation, userInfo, fetchData, fetchMore, orderBy }) => {
    const [documentData, setDocumentData] = useState([])
    const [lastVisible, setLastVisible] = useState(null)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {
        try {
            // Cloud Firestore: Initial Query
            retrieveData();
        }
        catch (error) {
            console.warn(error);
        }
    }, [])
    const retrieveData = async () => {
        try {
            // Set State: Loading
            setLoading(true)
            // Cloud Firestore: Query
            fetchData().then(allData => {
                setDocumentData(allData)
                setLastVisible(allData[allData.length - 1][orderBy])
                setLoading(false)
            })
        }
        catch (error) {
            console.warn(error);
        }
    };
    // Retrieve More
    const retrieveMore = () => {
        try {
            // Set State: Refreshing
            setRefreshing(true)
            // Cloud Firestore: Query (Additional Query)

            fetchMore(lastVisible).then(newData => {
                if (newData.length !== 0) {
                    setDocumentData([...documentData, ...newData])
                    setLastVisible(newData[newData.length - 1][orderBy])
                }
                setLoading(false)
            })
        }
        catch (error) {
            console.warn(error);
        }
    };
    // Render Footer
    const renderFooter = () => {
        try {
            // Check If Loading
            if (refreshing) {
                return (
                    <ActivityIndicator />
                )
            }
            return null;
        }
        catch (error) {
            console.warn(error);
        }
    };
    if (loading) return <LoadingScreen fullscreen />
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
            onEndReached={() => { retrieveMore() }}
            // How Close To The End Of List Until Next Data Request Is Made
            onEndReachedThreshold={Platform === "ios" ? 0 : 0.01}
            // Refreshing (Set To True When End Reached)
            refreshing={loading}
            onRefresh={() => {
                setLoading(true)
                retrieveData().then(() => setLoading(false))
            }}
        />
    )

}

export default InfiniteScrollFunc