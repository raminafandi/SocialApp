import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { wsize, hsize } from '../../entities/constants';
import { Feather } from '@expo/vector-icons';
import Button from '../../components/Button';
import PhotoGrid from '../../components/PhotoGrid';
import LoadingScreen from '../OtherScreens/LoadingScreen';
import { FlatList } from 'react-native-gesture-handler';
import * as userAPI from '../../services/api/user';
import * as itemAPI from '../../services/api/item';
import * as lookAPI from '../../services/api/look';
import { useNavigation } from '@react-navigation/native';
const tabs = {
  items: 'items',
  looks: 'looks',
  bookmarks: 'bookmarks',
};

const LooksTab = React.memo(({ user }) => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const fetchData = () => lookAPI.getUserLooks(user.id);
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
            <TouchableOpacity
              // style={{ width: wsize(123), height: wsize(123) }}
              // onPress={() => {
              //   navigation.navigate('AlternativeLook', item);
              // }}
              onPress={() => {

                navigation.navigate('AlternativeLook', {
                  item: item,
                  fromOtherProfile: true,
                  // items: item.data.images
                });
              }}
            >
              {item.coverImage ? (
                <Image
                  style={{ width: wsize(123), height: wsize(123) }}
                  source={{ uri: item.coverImage }}
                />
              ) : (
                  <TouchableOpacity onPress={() => {

                    navigation.navigate('AlternativeLook', {
                      item: item,
                      fromOtherProfile: true,
                      // items: item.data.images
                    });
                  }}>
                    <PhotoGrid
                      items={item.images}
                      clickEventListener={() => {
                        navigation.navigate('AlternativeLook', {
                          item: item,
                          // items: item.data.images
                        });
                        // navigation.navigate('AlternativeLook', item)
                      }
                      }
                      gridStyle={{
                        width: wsize(123),
                        height: wsize(123),
                        overflow: 'hidden',
                      }}
                      style={{ width: wsize(123), height: wsize(123) }}
                      imageStyle={{ width: 50, height: 50 }}
                      small
                      fromProfile
                    />
                  </TouchableOpacity>
                )}
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
});

const ItemsTab = React.memo(({ navigation, user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    itemAPI.getUserItems(user.id).then((querySnapshot) => {
      const allData = [];
      querySnapshot.forEach((doc) => {
        allData.push({ key: doc.id, ...doc.data() });
      });
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

const OtherProfileScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = route.params;
  const { bookmarks, items, looks } = tabs;
  const [userExtraInfo, setUserExstraInfo] = useState(null);
  const [currentTab, setCurrentTab] = useState(looks);
  const [isPrivate, setIsPrivate] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subText, setSubText] = useState('sub')
  const isSubscribed = () => {
    userAPI
      .getUserInfo()
      .then(
        (doc) =>
          doc.data().friends?.find((friend) => friend === user.id) &&
          setSubscribed(true)
      );
  };
  const fetchData = () => {
    userAPI.getUserInfo(user.id).then((doc) => {
      setUserExstraInfo(doc.data());
      doc.data().private && setIsPrivate(true);
      isSubscribed;
    });
  };
  const subscriptionHandler = () => {
    if (isPrivate) {
      userAPI.sendSubscribeRequestToPrivateUser(user.id);
      setSubText('requested')
      setSubscribed(true)
    } else {
      setSubText('unsub')
      setSubscribed(true)
      userAPI
        .subscribeToUser(user.id)
        .catch(console.error);
    }
  };
  const unsubscriptionHandler = () => {
    setSubscribed(false)
    setSubText('sub')
    userAPI.unsubscribeFromUser(user.id);

  };
  useEffect(() => {
    fetchData();
    isSubscribed();
  }, []);
  if (!userExtraInfo) return <LoadingScreen fullscreen />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileInitialContainer}>
        <Image
          style={styles.profilePhoto}
          source={{
            uri: user.photo,
          }}
        />
        <View style={styles.profileNameContainer}>
          <Text style={styles.profileName}>{user.userName}</Text>
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
                {userExtraInfo.friends.length}
              </Text>
              <Text style={styles.followersText}>friends</Text>
            </View>
            <View style={styles.followers}>
              <Text style={styles.followersNumbers}>
                {userExtraInfo.subs.length}
              </Text>
              <Text style={styles.followersText}>subs</Text>
            </View>
          </View>
          <View style={styles.followersContainerRight}>
            {/* <TouchableOpacity style={styles.followersLittleButton}>
              <Text style={styles.lbuttonText}>chat</Text>
            </TouchableOpacity> */}
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
          title={subText}
          disabled={subText === "requested" ? true : false}
          style={{
            backgroundColor: subscribed ? '#D8D8D8' : '#0148FF',
            marginTop: wsize(20),
            width: wsize(327),
          }}
          titleStyle={{
            color: subscribed ? '#444' : '#fff',
            fontSize: wsize(21),
          }}
          onPress={() => {
            subscribed ? unsubscriptionHandler() : subscriptionHandler();
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
      </View>
      <View>
        {isPrivate && !subscribed ? (
          <View
            style={{
              paddingTop: 20,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontWeight: 'bold' }}>This Account is Private</Text>
            <Text>Follow to see their photos and videos.</Text>
          </View>
        ) : currentTab === looks ? (
          <LooksTab navigation={navigation} user={user} />
        ) : (
              <ItemsTab navigation={navigation} user={user} />
            )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

export default OtherProfileScreen;
