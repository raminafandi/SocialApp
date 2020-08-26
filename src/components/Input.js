import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { hsize, wsize } from '../entities/constants'

export default function Input(props) {
    return (
        <View style={styles.container}>
            <TextInput
                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#ececec',
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderRadius: 5,
        height: hsize(68),
        justifyContent: 'center',
        marginHorizontal: wsize(34),
        marginBottom: hsize(2),
        paddingStart: 10,
    },
})