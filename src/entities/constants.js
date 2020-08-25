import {
    Dimensions
} from 'react-native'


export const window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

export const wsize = (size) => size/window.width * window.width;
export const hsize = (size) => size/window.height * window.height;

export const fontSize = {
    
}