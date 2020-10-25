import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { hsize, wsize } from '../entities/constants'

export default function Input(props) {
    return (
        <View style={styles.container}>
            <TextInput
                {...props}
                autoCapitalize="none"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#ececec',
        backgroundColor: '#fafafa',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 5,
        width: wsize(293),
        height: hsize(56),
        justifyContent: 'center',
        marginBottom: hsize(14),
        paddingStart: wsize(17),
    },
})