import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import {wsize} from '../entities/constants'

export default function TextButton({ style, children, ...props }) {
    return (
        <TouchableOpacity {...props}>
            <Text style={[styles.text, style]}>{children}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    text: {
        color: '#52BDEB',
        fontWeight: 'bold',
        marginLeft: wsize(3),
    },
})
