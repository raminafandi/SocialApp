import React, { memo } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';

export default memo(({ onPress, navigation, ...props }) => {
    return (
        <HeaderBackButton
            {...props}
            onPress={() => {
                onPress();
                navigation.goBack();
            }}
        />
    );
})
