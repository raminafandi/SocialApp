import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoadingScreen = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#52BDEB" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
});

export default LoadingScreen;