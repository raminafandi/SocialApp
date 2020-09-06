import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

import { window, wsize, hsize } from '../../entities/constants';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import Button from '../../components/Button';
import Tag from '../../components/Tag';
import firebase from '../../services/firebase/index';
import * as itemAPI from '../../services/api/item';
import LoadingScreen from '../OtherScreens/LoadingScreen';

const AddItemScreen = ({ route, navigation }) => {
  const iconSize = wsize(26);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const renderingTags = tags.map((item, index) => {
    return <Tag title={item} key={index} />;
  });
  const db = firebase.firestore();
  const { img } = route.params;

  const saveHandler = async () => {
    setImageLoading(true);
    itemAPI
      .addItem({ img, name, brand, description, price })
      .then(() => {
        setImageLoading(false);
        Alert.alert('Completed!', 'Item has successfully added');
        navigation.navigate('AddPhoto');
      })
      .catch((err) => console.log(err));
  };
  if (imageLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.postContainer}>
          <View style={styles.postImageContainer}>
            <Image
              onError={() => {
                Alert.alert('Error', 'No image has found');
                navigation.goBack();
              }}
              source={{
                uri: img,
              }}
              resizeMode="contain"
              style={styles.postImage}
            />
          </View>
          <View style={styles.postInfoContainer}>
            <TextInput
              placeholder="Name of Item"
              onChangeText={(text) => setName(text)}
              style={styles.textInputBold}
            />
            <TextInput
              placeholder="Brand of Item"
              onChangeText={(text) => setBrand(text)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Price of Item"
              keyboardType="numeric"
              onChangeText={(text) => setPrice(text)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Description of Item"
              onChangeText={(text) => setDescription(text)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add Tags..."
              value={tag}
              onChangeText={(text) => {
                setTag(text);
              }}
              maxLength={30}
              style={styles.tagsInput}
            />
            <TouchableOpacity
              style={styles.enterButton}
              onPress={() => {
                if (tag !== '') {
                  setTags([...tags, tag]);
                  setTag('');
                }
              }}>
              <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.tagsContainer}>{renderingTags}</View>
          <Button
            title="Save"
            style={{ backgroundColor: 'red' }}
            onPress={saveHandler}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(24),
  },
  postContainer: {
    justifyContent: 'center',
  },
  postImageContainer: {
    alignItems: 'center',
    marginBottom: hsize(54),
  },
  postImage: {
    width: wsize(304),
    height: hsize(235),
  },
  textInputBold: {
    fontSize: 22,
    borderBottomColor: 'grey',
    alignSelf: 'center',
    // borderBottomWidth: 1,
    borderRadius: 5,
    // width: wsize(293),
    fontWeight: 'bold',
    height: hsize(33),
    justifyContent: 'center',
    marginBottom: hsize(14),
    paddingStart: wsize(17),
  },
  textInput: {
    fontSize: 20,
    borderBottomColor: 'grey',
    alignSelf: 'center',
    borderRadius: 5,
    height: hsize(33),
    justifyContent: 'center',
    marginBottom: hsize(14),
    paddingStart: wsize(17),
  },
  inputContainer: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#DADBDA',
    paddingHorizontal: wsize(10),
    height: hsize(33),
    borderRadius: wsize(5),
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingStart: wsize(17),
    flexDirection: 'row',
  },
  tagsInput: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  enterButton: {
    borderLeftWidth: 1,
    borderLeftColor: '#DADBDA',
    height: hsize(33),
    width: wsize(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: wsize(260),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hsize(25),
  },
});
export default AddItemScreen;
