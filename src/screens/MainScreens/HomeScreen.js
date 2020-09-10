import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { window, wsize, hsize } from '../../entities/constants';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import LoadingScreen from '../OtherScreens/LoadingScreen';
import PhotoCarousel from '../../components/PhotoCarousel';
import PhotoGrid from '../../components/PhotoGrid';
import Tag from '../../components/Tag';
import Comment from '../../components/Comment';
import TextButton from '../../components/TextButton';

import firebase from '../../services/firebase/index';
import * as lookApi from '../../services/api/look';
const iconSize = wsize(28);

const HeartButton = React.memo(({ look }) => {
  const [liked, setLiked] = useState(false);
  const currentUser = firebase.auth().currentUser;
  const likeHandler = () => {
    lookApi.likeLook(look.id).then(() => setLiked(true));
  };
  const dislikeHandler = () => {
    lookApi.dislikeLook(look.id).then(() => setLiked(false));
  };
  useEffect(() => {
    if (look.likes.find((like) => like === currentUser.uid)) setLiked(true);
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        liked ? dislikeHandler() : likeHandler();
      }}>
      <AntDesign
        name={liked ? 'heart' : 'hearto'}
        size={iconSize}
        color={liked ? 'red' : 'black'}
        style={styles.postActionIcon}
      />
    </TouchableOpacity>
  );
});
const Post = ({ look, navigation }) => {
  const clickEventListener = (item) => {
    navigation.navigate('Item', { fetchId: item.id });
  };
  const profileClickHandler = () => {
    navigation.navigate('OtherProfile', { user: look.author });
  };
  const carouselOrGrid = look.coverImage ? (
    <PhotoCarousel
      data={[{ image: look.coverImage }, ...look.images]}
      clickEventListener={clickEventListener}
    />
  ) : (
    <PhotoGrid items={look.images} clickEventListener={clickEventListener} />
  );
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeaderContainer}>
        <TouchableOpacity
          style={styles.postHeaderFirst}
          onPress={profileClickHandler}>
          <Image
            source={{
              uri: look.author.photo,
            }}
            style={styles.postHeaderIcon}
          />
          <Text style={styles.postHeaderProfileName}>
            {look.author.userName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postHeaderSecond}>
          <Entypo name="dots-three-horizontal" size={wsize(24)} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.postDescription}>
        <Text>{look.description}</Text>
      </View>
      <View style={styles.postImageContainer}>{carouselOrGrid}</View>
      <View style={styles.postActionsContainer}>
        <View style={styles.postActionsLeft}>
          <HeartButton look={look} />
          <TouchableOpacity>
            <Feather
              name="message-circle"
              size={iconSize}
              color="black"
              style={styles.postActionIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo
              name="direction"
              size={iconSize}
              color="black"
              style={styles.postActionIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Feather
            name="bookmark"
            size={iconSize}
            color="black"
            style={styles.postActionIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.likesContainer}>
        <Text style={styles.likesText}>Liked by nee and 115 321 others</Text>
      </View>
      <View style={styles.postInfoContainer}>
        <TouchableOpacity onPress={profileClickHandler}>
          <Text style={styles.profileName}>{look.author.userName}</Text>
        </TouchableOpacity>
        {look.tags.map((tag, index) => {
          return <Tag title={tag} key={index} />;
        })}
      </View>
      <TouchableOpacity
        style={styles.viewComments}
        onPress={() => {
          navigation.navigate('Comments');
        }}>
        <Text>View all comments</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <Image
          source={{
            uri: 'https://i.imgur.com/YHk0msx.jpg',
          }}
          style={styles.postHeaderIcon}
        />
        <TextInput
          placeholder="Add a comment..."
          onChangeText={(text) => setComment(text)}
          style={styles.textInput}
        />
        <TextButton>Post</TextButton>
      </View>
    </View>
  );
};

const HomeScreen = React.memo(function ({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    return lookApi.getLooksForHomeScreen().then((querySnapshot) => {
      const allData = [];
      querySnapshot.forEach((doc) => {
        allData.push({ id: doc.id, ...doc.data() });
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
    return <LoadingScreen fullscreen />;
  }
  return (
    <View>
      <FlatList
        data={data}
        onRefresh={() => {
          setLoading(true);
          fetchData().then((res) => {
            setData(res);
            setLoading(false);
          });
        }}
        refreshing={loading}
        renderItem={({ item }) => <Post look={item} navigation={navigation} />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  postContainer: {
    marginHorizontal: wsize(12),
    marginBottom: hsize(30),
  },
  postHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hsize(11),
  },
  postHeaderFirst: {
    flexDirection: 'row',
  },
  postHeaderSecond: {
    marginRight: wsize(2),
  },
  postHeaderProfileName: {
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: wsize(14),
    marginLeft: wsize(9),
    color: '#262626',
  },
  postHeaderIcon: {
    width: wsize(34),
    height: wsize(34),
    borderRadius: wsize(17),
  },
  postDescription: {
    width: '100%',
    padding: hsize(4),
  },
  postImageContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginBottom: hsize(41),
  },
  postImage: {
    width: wsize(349),
    height: hsize(340),
  },
  postActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hsize(13),
  },
  postActionsLeft: {
    flexDirection: 'row',
    marginLeft: wsize(10),
  },
  postActionIcon: {
    marginRight: wsize(10),
  },
  likesContainer: {
    paddingHorizontal: wsize(4),
    marginBottom: hsize(11),
  },
  likesText: {},
  postInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: wsize(2),
  },
  profileName: {
    color: '#0148FF',
    fontWeight: 'bold',
  },
  viewComments: {
    marginLeft: wsize(2),
  },
  bottomContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: hsize(50),
    width: '100%',
    paddingHorizontal: wsize(2),
    paddingVertical: hsize(10),
  },
  textInput: {
    width: wsize(250),
  },
});
export default HomeScreen;
