import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { wsize, hsize } from '../../entities/constants';
import { Feather, Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import Button from '../../components/Button';
import LoadingScreen from '../OtherScreens/LoadingScreen';
import { AuthContext } from '../../services/context/AuthContext';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import PhotoCarousel from '../../components/PhotoCarousel';
import PhotoGrid from '../../components/PhotoGrid';
import UserModal from '../../components/UserModal';
import * as userAPI from '../../services/api/user';
import * as lookAPI from '../../services/api/look';
import * as itemAPI from '../../services/api/item';
import FontText from '../../components/FontText';

const tabs = {
  items: 'items',
  looks: 'looks',
  bookmarks: 'bookmarks',
};

const LooksTab = React.memo(({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = () => lookAPI.getUserLooks();
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
    <ScrollView style={{ height: '40%' }}>
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
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('AlternativeLook', item);
              }}>
              {item.coverImage ? (
                <Image
                  style={{ width: wsize(123), height: wsize(123) }}
                  source={{ uri: item.coverImage }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AlternativeLook', item);
                  }}>
                  <PhotoGrid
                    items={item.images}
                    clickEventListener={(itemFromGrid) =>
                      navigation.navigate('AlternativeLook', item)
                    }
                    gridStyle={{ width: wsize(123), height: wsize(123) }}
                  />
                </TouchableOpacity>
              )}
            </TouchableWithoutFeedback>
          );
        }}
      />
    </ScrollView>
  );
});

const ItemsTab = React.memo(function ({ navigation, user }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = () => itemAPI.getUserItems();
  useEffect(() => {
    fetchData().then((allData) => {
      setData(allData);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <LoadingScreen fullscreen />;
  }
  return (
    <ScrollView style={{ height: '40%' }}>
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
    </ScrollView>
  );
});

const BookmarsTab = React.memo(({ navigation, user }) => {
  return (
    <ScrollView style={{ height: '40%' }}>
      <FlatList
        numColumns={3}
        data={user.saved}
        renderItem={({ item }) => {
          if (item.item)
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Item', { fetchId: item.id });
                }}>
                <Image
                  style={{ width: wsize(124), height: wsize(123) }}
                  source={{ uri: item.data.image }}
                />
              </TouchableOpacity>
            );
          console.log(item);
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('AlternativeLook', item);
              }}>
              {item.data.coverImage ? (
                <Image
                  style={{ width: wsize(123), height: wsize(123) }}
                  source={{ uri: item.data.coverImage }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AlternativeLook', item.data);
                  }}>
                  <PhotoGrid
                    items={item.data.images}
                    clickEventListener={(itemFromGrid) =>
                      navigation.navigate('AlternativeLook', item.data)
                    }
                    gridStyle={{ width: wsize(123), height: wsize(123) }}
                  />
                </TouchableOpacity>
              )}
            </TouchableWithoutFeedback>
          );
        }}
      />
    </ScrollView>
  );
});
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

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <Entypo
          name="dots-three-horizontal"
          size={24}
          color="black"
          style={{ marginRight: 15 }}
        />
      </TouchableOpacity>
    ),
  });

  if (!userExtraInfo) return <LoadingScreen fullscreen />;
  return (
    <View style={styles.container}>
      <View style={styles.profileInitialContainer}>
        <Image
          style={styles.profilePhoto}
          source={{
            uri: user.photoURL,
          }}
        />
        <View style={styles.profileNameContainer}>
          <FontText font="MYRIADPRO" style={styles.profileName}>
            {user.displayName}
          </FontText>
          <FontText font="Rubik" style={styles.profileType}>
            {userExtraInfo.status}
          </FontText>
        </View>
      </View>
      <View style={styles.profileInfoContainer}>
        <View style={styles.profileInfo}>
          <FontText font="Rubik" style={styles.textInfo}>
            {userExtraInfo.city}
          </FontText>
        </View>
        <TouchableOpacity style={styles.profileInfo}>
          <FontText font="Rubik" style={styles.linkInfo}>
            {userExtraInfo.link}
          </FontText>
        </TouchableOpacity>
        {/* <View style={styles.profileInfo}>
          <FontText font="Rubik" style={styles.textInfo}>
            friends with michel_n, serg,dre and 91 others
          </FontText>
        </View> */}
        <View style={styles.followersContainer}>
          <View style={styles.followersContainerLeft}>
            <TouchableOpacity
              style={styles.followers}
              onPress={() => {
                navigation.navigate('Friends');
              }}>
              <FontText font="Rubik" style={styles.followersNumbers}>
                {userExtraInfo.friends.length}
              </FontText>
              <FontText font="Rubik" style={styles.followersText}>
                friends
              </FontText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.followers}
              onPress={() => {
                navigation.navigate('Subs');
              }}>
              <FontText font="Rubik" style={styles.followersNumbers}>
                {userExtraInfo.subs.length}
              </FontText>
              <FontText font="Rubik" style={styles.followersText}>
                subs
              </FontText>
            </TouchableOpacity>
          </View>
          <View style={styles.followersContainerRight}>
            <TouchableOpacity style={styles.followersLittleButton}>
              <FontText font="Rubik" style={styles.lbuttonText}>
                info
              </FontText>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title="edit info"
          onPress={() => {
            navigation.navigate('EditProfile', {
              userExtraInfo: {
                name: userExtraInfo.name,
                photoURL: userExtraInfo.photoURL,
                userName: userExtraInfo.userName,
                status: userExtraInfo.status,
                city: userExtraInfo.city,
                link: userExtraInfo.link,
                description: userExtraInfo.description,
                email: userExtraInfo.email,
                phone: userExtraInfo.phone,
                gender: userExtraInfo.gender,
              },
            });
          }}
          style={{
            backgroundColor: '#D8D8D8',
            marginTop: wsize(20),
            width: wsize(327),
            marginBottom: hsize(10),
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
        {currentTab === looks && (
          <LooksTab navigation={navigation} user={user} />
        )}
        {currentTab === items && (
          <ItemsTab navigation={navigation} user={user} />
        )}
        {currentTab === bookmarks && (
          <BookmarsTab navigation={navigation} user={userExtraInfo} />
        )}
      </View>
      <UserModal
        setModalVisible={setModalVisible}
        visible={modalVisible}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: hsize(44),
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
    fontWeight: 'bold',
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
