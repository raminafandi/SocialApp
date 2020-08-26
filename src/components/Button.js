import React from 'react';
import { StyleSheet } from 'react-native'
import { wsize, hsize } from '../entities/constants'
import { Button, ButtonProps} from 'react-native-elements';

const CustomButton = ({ style, ...props }) => {
    return (
        <Button
            buttonStyle={[styles.button, style]}
            {...props}
        />
    )
}

CustomButton.prototype = ButtonProps;
export default CustomButton;
const styles = StyleSheet.create({
    button: {
        marginHorizontal: wsize(34),
        backgroundColor: '#52BDEB',
        marginTop: hsize(13),
        borderRadius: 4,
        padding: 10,
    }
})