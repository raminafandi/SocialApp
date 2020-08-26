import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
  Share,
  SafeAreaView
} from 'react-native';
import {
  wsize,
  hsize
} from '../../entities/constants'
import {
  Feather,
} from '@expo/vector-icons';

const ProfileScreen = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.profileInitialContainer}>
          <Image
            style={styles.profilePhoto}
            source={{
              uri:
                'https://i.pinimg.com/originals/13/cd/aa/13cdaa237c11e435b7a03f3ba7bc8fd3.jpg',
            }}
          />
          <View style={styles.profileNameContainer}>
            {/* <Text style={styles.profileName}>mbeer</Text> */}
            <Text style={[styles.profileName, styles.profileType]}>Who let the dogs out? </Text>
          </View>
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text>Friends</Text>
          </View>
          <View style={styles.header}>
            <Text>Messages</Text>
          </View>
          <View style={styles.header}>
            <Text>Contacts</Text>
          </View>
        </View>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileInfo}>
            <Text style={styles.textInfo}>city:New York</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.textInfo}>m.youtube.com</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.textInfo}>
              friends with michel_n, serg,dre and 91 others
            </Text>
          </View>
          <View style={styles.followersContainer}>
            <View style={styles.followers}>
              <Text style={styles.followersNumbers}>213</Text>
              <Text style={styles.followersText}>Friends</Text>
            </View>
            <View style={styles.followers}>
              <Text style={styles.followersNumbers}>863</Text>
              <Text style={styles.followersText}>Subs</Text>
            </View>
          </View>
        </View>
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <Feather name="folder" size={30} color="black" />
          </View>
          <View style={styles.tab}>
            <Feather name="bookmark" size={30} color="black" />
          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  profileInitialContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileNameContainer: {
    marginLeft: wsize(30),
    marginTop: hsize(30),
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileType: {
    fontSize: 16,
  },
  profileInfoContainer: {
    paddingTop: hsize(10),
    marginLeft: wsize(14),
  },
  profileInfo: {
    flexDirection: 'row',
  },
  textInfo: {
    fontSize: 15,
  },
  headerContainer: {
    marginLeft: wsize(14),
    flexDirection: 'row',
  },
  header: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'grey',
    alignItems: 'center',
    padding: 5,
    width: '27%',
    marginHorizontal: wsize(5),
  },
  followersContainer: {
    marginTop: hsize(14),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  followers: {
    alignItems: 'center',
    paddingHorizontal: wsize(15),
  },
  followersNumbers: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  followersText: {
    fontSize: 16,
  },
  tabContainer: {
    borderWidth: 1,
    padding: hsize(9),
    borderColor: '#DADBDA',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
  },
});

export default ProfileScreen;
