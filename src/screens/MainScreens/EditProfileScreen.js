import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';

import LoadingScreen from '../OtherScreens/LoadingScreen';
import { AuthContext } from '../../services/context/AuthContext';
import { window, wsize, hsize } from '../../entities/constants';
import TextButton from '../../components/TextButton';
import { updateUserInfo } from '../../services/api/user';
import { launchImageLibraryAsync } from 'expo-image-picker';
const borderCOLOR = '#DADBDA';

const EditProfileScreen = ({ route, navigation }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { userExtraInfo } = route.params;
  const [name, setName] = useState(userExtraInfo.fullName || '');
  const [userName, setUserName] = useState(user.displayName || '');
  const [status, setStatus] = useState(userExtraInfo.status || '');
  const [city, setCity] = useState(userExtraInfo.city || '');
  const [link, setLink] = useState(userExtraInfo.link || '');
  const [description, setDescription] = useState(
    userExtraInfo.additionalInfo || ''
  );
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phoneNumber || '');
  const [gender, setGender] = useState(userExtraInfo.gender || '');
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [loading, setLoading] = useState(false);
  const iconSize = wsize(28);
  const submitHandler = () => {
    setLoading(true);
    updateUserInfo(user, {
      name,
      photoURL,
      userName,
      status,
      city,
      link,
      description,
      email,
      phone,
      gender,
    })
      .then(() => {
        navigation.navigate('Profile');
      })
      .finally(() => setLoading(false));
  };
  navigation.setOptions({
    headerRight: () => (
      <TextButton
        style={{ marginRight: wsize(10) }}
        textStyle={{
          fontWeight: 'bold',
          color: '#0148FF',
          fontSize: wsize(18),
        }}
        onPress={submitHandler}>
        Save
      </TextButton>
    ),
  });
  const changeProfilePicture = async () => {
    const res = await launchImageLibraryAsync();
    if (!res.cancelled) setPhotoURL(res.uri);
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.profilePhoto}
            source={{
              uri: photoURL,
            }}
          />
          <TextButton onPress={changeProfilePicture}>
            Change profile photo
          </TextButton>
        </View>
        <View style={styles.aboutPageContainer}>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Name</Text>
            <TextInput
              style={styles.lineInput}
              value={name}
              onChangeText={(text) => setName(text)}
              maxLength={45}
            />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Username</Text>
            <TextInput
              style={styles.lineInput}
              value={userName}
              onChangeText={(text) => setUserName(text)}
              maxLength={45}
            />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Status</Text>
            <TextInput
              style={styles.lineInput}
              value={status}
              onChangeText={(text) => setStatus(text)}
              maxLength={200}
            />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>City</Text>
            <TextInput
              style={styles.lineInput}
              value={city}
              onChangeText={(text) => setCity(text)}
              maxLength={30}
            />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Link</Text>
            <TextInput
              style={styles.lineInput}
              value={link}
              onChangeText={(text) => setLink(text)}
              maxLength={30}
            />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>About me </Text>
            <TextInput
              style={styles.lineInput}
              value={description}
              onChangeText={(text) => setDescription(text)}
              maxLength={300}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleMain}>Private Information</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Email</Text>
            <TextInput
              style={styles.lineInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
              maxLength={45}
            />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Phone</Text>
            <TextInput
              style={styles.lineInput}
              value={phone}
              onChangeText={(text) => setPhone(text)}
              maxLength={15}
            />
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.lineTitle}>Gender</Text>
            <TextInput
              style={styles.lineInput}
              value={gender}
              onChangeText={(text) => setGender(text)}
              maxLength={8}
            />
          </View>
          <View style={styles.lineContainer} />
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
    width: wsize(80),
    height: wsize(80),
    borderRadius: wsize(40),
  },
  lineContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: borderCOLOR,
    padding: wsize(8),
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
