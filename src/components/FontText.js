import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

const fontLoaded = React.memo(function ({ children, font, style, ...props }) {
  const [fontLoaded] = useFonts({
    RubikItalic: require('../assets/fonts/Rubik-Italic-VariableFont_wght.ttf'),
    Rubik: require('../assets/fonts/Rubik-VariableFont_wght.ttf'),
    MYRIADPRO: require('../assets/fonts/MyriadPro-Light.otf'),
  });
  if (fontLoaded) {
    return (
      <Text style={[{ fontFamily: font }, style]} {...props}>
        {children}
      </Text>
    );
  } else {
    return (
      <Text style={style} {...props}>
        {children}
      </Text>
    );
  }
});

export default fontLoaded;
