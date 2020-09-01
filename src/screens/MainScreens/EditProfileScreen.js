import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';

import Tag from '../../components/Tag';
import Comment from '../../components/Comment';

import { window, wsize, hsize } from '../../entities/constants';
const borderCOLOR = '#DADBDA';

const EditProfileScreen = ({}) => {
  const iconSize = wsize(28);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.profilePhoto}
            source={{
              uri:
                'https://i.pinimg.com/originals/13/cd/aa/13cdaa237c11e435b7a03f3ba7bc8fd3.jpg',
            }}
          />
          <TouchableOpacity>
            <Text>Change profile photo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.aboutPageContainer}>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Name</Text>
            <TextInput style={styles.lineInput} />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Username</Text>
            <TextInput style={styles.lineInput} />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Status</Text>
            <TextInput style={styles.lineInput} />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>City</Text>
            <TextInput style={styles.lineInput} />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Link</Text>
            <TextInput style={styles.lineInput} />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>About me </Text>
            <TextInput style={styles.lineInput} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleMain}>Private Information</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Email</Text>
            <TextInput style={styles.lineInput} />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Phone</Text>
            <TextInput style={styles.lineInput} />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Gender</Text>
            <TextInput style={styles.lineInput} />
          </View>
          <View style={styles.lineContainer}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    height: hsize(130),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: wsize(40),
  },
  lineContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: borderCOLOR,
    padding: wsize(4),
    paddingLeft: wsize(19),
  },
  lineTitle: {
    fontWeight: 'bold',
    fontSize: wsize(14),
    width: wsize(104),
  },
  lineInput: {
    fontSize: wsize(14),
    width: wsize(253),
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: hsize(45),
    justifyContent: 'center',
    alignItems: 'center',
    padding: wsize(4),
    paddingLeft: wsize(19),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: borderCOLOR,
    borderTopColor: borderCOLOR,
  },
  titleMain: {
    fontWeight: 'bold',
    fontSize: wsize(14),
    width: '100%',
  },
});
export default EditProfileScreen;
