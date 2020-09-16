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
import Button from '../../components/Button';
import LoadingScreen from '../OtherScreens/LoadingScreen';
import { FlatList } from 'react-native-gesture-handler';
import * as userAPI from '../../services/api/user';
import * as itemAPI from '../../services/api/item';
const tabs = {
  items: 'items',
  looks: 'looks',
  bookmarks: 'bookmarks',
};

const LooksTab = React.memo(({ navigation }) => {
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
    } else {
      userAPI.subscribeToUser(user.id).then(() => setSubscribed(true));
    }
  };
  const unsubscriptionHandler = () => {
    userAPI.unsubscribeFromUser(user.id).then(() => setSubscribed(false));
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
            <TouchableOpacity style={styles.followersLittleButton}>
              <Text style={styles.lbuttonText}>chat</Text>
            </TouchableOpacity>
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
          title={subscribed ? 'unsub' : 'sub'}
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
          <Text>Private</Text>
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

export default OtherProfileScreen;
