import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Input from '../../components/Input';
import { window, wsize, hsize } from '../../entities/constants';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const AddPhotoScreen = ({ navigation }) => {
  const [link, setLink] = useState('');

  const linkHandler = () => {
    const alertMessage = Alert.alert.bind(null, 'Error', 'Unable to get image from url')
    fetch(link)
      .then((res) => {
        if (res.status === 404)
          alertMessage()
        else
          navigation.navigate('AddItem', { img: link })
      })
      .catch(err => alertMessage())
  }
  const cameraHandler = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      navigation.navigate('AddItem', { img: result.uri });
    }
  };

  const galeryHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      navigation.navigate('AddItem', { img: result.uri });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Paste the Link"
            onChangeText={(text) => setLink(text)}
            selectTextOnFocus={true}
            style={styles.textInput}
          />
          <TouchableOpacity
            style={styles.enterButton}
            onPress={linkHandler}>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.or}>OR</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab1} onPress={cameraHandler}>
            <Feather name="camera" size={wsize(32)} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab2} onPress={galeryHandler}>
            <MaterialIcons name="insert-photo" size={wsize(32)} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
  },
  inputContainer: {
    borderColor: '#ececec',
    backgroundColor: '#fafafa',
    alignSelf: 'center',
    borderWidth: 1,
    width: wsize(304),
    height: hsize(70),
    borderRadius: wsize(12),
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingStart: wsize(17),
    flexDirection: 'row',
  },
  textInput: {
    fontSize: wsize(18),
    width: wsize(240)
  },
  enterButton: {
    borderLeftWidth: 1,
    borderLeftColor: '#DADBDA',
    height: hsize(70),
    width: wsize(43),
    justifyContent: 'center',
    alignItems: 'center',
  },
  or: {
    fontSize: wsize(30),
    fontWeight: '500',
    marginVertical: hsize(18),
  },

  tabContainer: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    width: wsize(304),
    height: hsize(70),
    borderRadius: wsize(12),
    borderColor: '#DADBDA',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab1: {
    alignItems: 'center',
    width: wsize(152),
    borderRightWidth: 1,
    borderRightColor: '#DADBDA',
  },
  tab2: {
    alignItems: 'center',
    width: wsize(152),
    borderLeftWidth: 1,
    borderLeftColor: '#DADBDA',
  },
});
export default AddPhotoScreen;
