import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { wsize, hsize, fontSize } from '../entities/constants';
const CustomButton = ({ style, title, titleStyle, icon, ...props }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      {icon}
      <Text adjustsFontSizeToFit style={[styles.text, titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: wsize(293),
    height: hsize(56),
    backgroundColor: '#FCF9FC',
    // marginTop: hsize(13),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DADBDA',
  },
  text: {
    fontSize: wsize(15),
    // lineHeight: wsize(18),
    letterSpacing: 0.6,
    color: '#313131',
  },
});
