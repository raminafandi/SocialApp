import {
    Dimensions
} from 'react-native'


export const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

export const wsize = size => size / 375 * window.width;
export const hsize = size => size / 812 * window.height;
