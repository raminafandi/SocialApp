import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { wsize, hsize } from '../../entities/constants';
import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import Button from '../../components/Button';
import LoadingScreen from '../OtherScreens/LoadingScreen';
import { AuthContext } from '../../services/context/AuthContext';
import { FlatList } from 'react-native-gesture-handler';
import UserModal from '../../components/UserModal';
import * as userAPI from '../../services/api/user';
import * as lookAPI from '../../services/api/look';
import * as itemAPI from '../../services/api/item';
const tabs = {
  items: 'items',
  looks: 'looks',
  bookmarks: 'bookmarks',
};

const LooksTab = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    return lookAPI.getUserLooks().then((querySnapshot) => {
      const allData = [];
      querySnapshot.forEach((doc) => {
        allData.push({ key: doc.id, ...doc.data() });
      });
      return allData;
    });
  };
  useEffect(() => {
    fetchData().then((allData) => {
      setData(allData);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <FlatList
      numColumns={3}
      data={data}
      onRefresh={() => {
        setLoading(true);
        fetchData().then((res) => {
          setData(res);
          setLoading(false);
        });
      }}
      refreshing={loading}
      renderItem={({ look }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Look', look);
          }}>
          <Image
            style={{ width: wsize(124), height: wsize(123) }}
            // source={{ uri: look.images[0].image }}
          />
        </TouchableOpacity>
      )}
    />
  );
};

const ItemsTab = React.memo(function ({ navigation, user }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    return itemAPI.getUserItems(user.uid).then((querySnapshot) => {
      const allData = [];
      querySnapshot.forEach((doc) => {
        allData.push({ key: doc.id, ...doc.data() });
      });
      return allData;
    });
  };
  useEffect(() => {
    fetchData().then((allData) => {
      setData(allData);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <FlatList
      numColumns={3}
      data={data}
      onRefresh={() => {
        setLoading(true);
        fetchData().then((res) => {
          setData(res);
          setLoading(false);
        });
      }}
      refreshing={loading}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Item', item);
          }}>
          <Image
            style={{ width: wsize(124), height: wsize(123) }}
            source={{ uri: item.image }}
          />
        </TouchableOpacity>
      )}
    />
  );
});

const BookmarsTab = ({ navigation }) => {
  return (
    <FlatList
      numColumns={3}
      // data={data}
      // renderItem={({ item }) => (
      //   <TouchableOpacity
      //     onPress={() => {
      //       navigation.navigate('Item', item);
      //     }}>
      //     <Image
      //       style={{ width: wsize(124), height: wsize(123) }}
      //       source={{ uri: item.img }}
      //     />
      //   </TouchableOpacity>
      // )}
    />
  );
};
const ProfileScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, logout } = authContext;
  const { bookmarks, items, looks } = tabs;
  const [userExtraInfo, setUserExstraInfo] = useState(null);
  const [currentTab, setCurrentTab] = useState(looks);
  const isFocused = useIsFocused();
  useEffect(() => {
    userAPI.getUserInfo(user.uid).then((doc) => setUserExstraInfo(doc.data()));
  }, [isFocused]);
  if (!userExtraInfo) return <LoadingScreen fullscreen />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileInitialContainer}>
        <Image
          style={styles.profilePhoto}
          source={{
            uri: user.photoURL,
          }}
        />
        <View style={styles.profileNameContainer}>
          <Text style={styles.profileName}>{user.displayName}</Text>
          <Text style={styles.profileType}>{userExtraInfo.status}</Text>
        </View>
      </View>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileInfo}>
          <Text style={styles.textInfo}>{userExtraInfo.city}</Text>
        </View>
        <TouchableOpacity style={styles.profileInfo}>
          <Text style={styles.linkInfo}>{userExtraInfo.link}</Text>
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.textInfo}>
            friends with michel_n, serg,dre and 91 others
          </Text>
        </View>
        <View style={styles.followersContainer}>
          <View style={styles.followersContainerLeft}>
            <View style={styles.followers}>
              <Text style={styles.followersNumbers}>
                {userExtraInfo.friends}
              </Text>
              <Text style={styles.followersText}>friends</Text>
            </View>
            <View style={styles.followers}>
              <Text style={styles.followersNumbers}>{userExtraInfo.subs}</Text>
              <Text style={styles.followersText}>subs</Text>
            </View>
          </View>
          <View style={styles.followersContainerRight}>
            <TouchableOpacity
              style={styles.followersLittleButton}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Text style={styles.lbuttonText}>info</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="edit info"
          onPress={() => {
            navigation.navigate('EditProfile', { userExtraInfo });
          }}
          style={{
            backgroundColor: '#D8D8D8',
            marginTop: wsize(20),
            width: wsize(327),
          }}
          titleStyle={{
            color: '#444444',
            fontSize: wsize(21),
          }}
        />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setCurrentTab(looks)}>
          <Feather
            name="package"
            size={30}
            color={currentTab === looks ? 'blue' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentTab(items)}>
          <Feather
            name="file"
            size={30}
            color={currentTab === items ? 'blue' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentTab(bookmarks)}>
          <Feather
            name="bookmark"
            size={30}
            color={currentTab === bookmarks ? 'blue' : 'black'}
          />
        </TouchableOpacity>
      </View>
      <View>
        {currentTab === looks && <LooksTab navigation={navigation} />}
        {currentTab === items && <ItemsTab navigation={navigation} user={user} />}
        {currentTab === bookmarks && <BookmarsTab navigation={navigation} />}
      </View>
      <UserModal
        setModalVisible={setModalVisible}
        visible={modalVisible}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
    height: hsize(50),
    alignItems: 'center',
    borderColor: '#DADBDA',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ProfileScreen;
