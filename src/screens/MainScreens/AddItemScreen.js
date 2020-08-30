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
} from 'react-native';

import { window, wsize, hsize } from '../../entities/constants';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import Button from '../../components/Button';
import Tag from '../../components/Tag';

const AddItemScreen = ({ route }) => {
  const iconSize = wsize(26);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  //   const { img, title, price, info, author } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.postContainer}>
          <View style={styles.postImageContainer}>
            <Image
              source={{
                uri:
                  'https://images-na.ssl-images-amazon.com/images/I/71MmCZd9fKL._AC_UX385_.jpg',
              }}
              style={styles.postImage}
            />
          </View>
          <View style={styles.postInfoContainer}>
            <TextInput
              placeholder="Name of Item"
              onChangeText={(text) => setName(text)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Brand of Item"
              onChangeText={(text) => setBrand(text)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Price of Item"
              onChangeText={(text) => setPrice(text)}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Description of Item"
              onChangeText={(text) => setDescription(text)}
              style={styles.textInput}
            />
          </View>
          <Button title="Save" style={{ backgroundColor: 'red' }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  postContainer: {
    justifyContent: 'center',
  },
  postImageContainer: {
    alignItems: 'center',
  },
  postImage: {
    width: wsize(288),
    height: hsize(219),
  },

  textInput: {
    fontSize: wsize(22),
    borderBottomColor: 'grey',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderRadius: 5,
    width: wsize(293),
    height: hsize(56),
    justifyContent: 'center',
    marginBottom: hsize(14),
    paddingStart: wsize(17),
  },
});
export default AddItemScreen;
