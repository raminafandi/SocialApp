import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoadingScreen = ({ style, fullscreen, ...props }) => (
    <View style={[styles.container, { flex: fullscreen ? 1 : 0 }, style]}>
        <ActivityIndicator size="large" color="#52BDEB" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },
});

export default LoadingScreen;