import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { wsize, hsize } from '../../entities/constants';
import { Feather } from '@expo/vector-icons';

import Button from '../../components/Button';
import { AuthContext } from '../../services/context/AuthContext';
import { FlatList } from 'react-native-gesture-handler';

import data from '../../data/mock.json';
const ProfileScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
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
          <Text style={styles.profileName}>mbeer</Text>
          <Text style={styles.profileType}>Who let the dogs out?</Text>
        </View>
      </View>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileInfo}>
          <Text style={styles.textInfo}>city:New York</Text>
        </View>
        <TouchableOpacity style={styles.profileInfo}>
          <Text style={styles.linkInfo}>m.youtube.com</Text>
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.textInfo}>
            friends with michel_n, serg,dre and 91 others
          </Text>
        </View>
        <View style={styles.followersContainer}>
          <View style={styles.followersContainerLeft}>
            <View style={styles.followers}>
              <Text style={styles.followersNumbers}>213</Text>
              <Text style={styles.followersText}>friends</Text>
            </View>
            <View style={styles.followers}>
              <Text style={styles.followersNumbers}>863</Text>
              <Text style={styles.followersText}>subs</Text>
            </View>
          </View>
          <View style={styles.followersContainerRight}>
            <TouchableOpacity style={styles.followersLittleButton}>
              <Text style={styles.lbuttonText}>chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followersLittleButton}>
              <Text style={styles.lbuttonText}>info</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="sub"
          onPress={authContext.logout}
          style={{
            backgroundColor: '#0148FF',
            marginTop: wsize(20),
            width: wsize(327),
          }}
          titleStyle={{
            color: 'white',
            fontSize: wsize(21),
          }}
        />
      </View>
      <View style={styles.tabContainer}>
        <View style={styles.tab}>
          <Feather name="folder" size={30} color="black" />
        </View>
        <View style={styles.tab}>
          <Feather name="bookmark" size={30} color="black" />
        </View>
      </View>
      <View>
        <FlatList
          numColumns={3}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Item', item);
              }}>
              <Image
                style={{ width: wsize(124), height: hsize(123) }}
                source={{ uri: item.img }}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(44),
  },
  profileInitialContainer: {
    flexDirection: 'row',
    paddingHorizontal: wsize(25),
    paddingVertical: hsize(23),
  },
  profilePhoto: {
    width: wsize(80),
    height: wsize(80),
    borderRadius: wsize(40),
  },
  profileNameContainer: {
    marginLeft: wsize(22),
    justifyContent: 'center',
    alignContent: 'center',
  },
  profileName: {
    fontSize: wsize(24),
    fontWeight: '500',
    color: '#262626',
  },
  profileType: {
    fontSize: wsize(14),
  },
  profileInfoContainer: {
    paddingTop: hsize(14),
    marginBottom: hsize(2),
    alignSelf: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
  },
  textInfo: {
    fontSize: wsize(12),
  },
  linkInfo: {
    fontSize: wsize(12),
    color: '#003569',
  },
  followersContainer: {
    marginTop: hsize(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  followersContainerLeft: {
    marginTop: hsize(14),
    flexDirection: 'row',
  },
  followersContainerRight: {
    marginTop: hsize(14),
    flexDirection: 'row',
  },
  followers: {
    flexDirection: 'row',
    marginRight: wsize(19),
  },
  followersNumbers: {
    fontSize: wsize(15),
    fontWeight: 'bold',
    marginRight: wsize(3),
  },
  followersText: {
    fontSize: wsize(15),
  },
  followersLittleButton: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: wsize(10),
    marginLeft: wsize(4),
  },
  lbuttonText: {
    color: '#0148FF',
    fontSize: wsize(14),
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
