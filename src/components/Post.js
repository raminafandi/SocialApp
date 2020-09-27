import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { window, wsize, hsize } from '../entities/constants';
import { Entypo, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import PhotoCarousel from './PhotoCarousel';
import PhotoGrid from './PhotoGrid';
import Tag from './Tag';
import TextButton from './TextButton';
import firebase from '../services/firebase/index';
import CommentForm from './CommentForm';
import * as lookApi from '../services/api/look';
import { bookmark, unmark } from '../services/api/user';
import FontText from '../components/FontText';
const iconSize = wsize(28);

const HeartButton = React.memo(({ look, updateLikes }) => {
  const [liked, setLiked] = useState(false);
  const currentUser = firebase.auth().currentUser;
  const likeHandler = () => {
    setLiked(true);
    updateLikes(1);
    lookApi.likeLook(look.id);
  };
  const dislikeHandler = () => {
    setLiked(false);
    updateLikes(-1);
    lookApi.dislikeLook(look.id);
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

const BookmarkButton = React.memo(({ look, userInfo }) => {
  const [marked, setMarked] = useState(false);
  const bookmarkHandler = () => {
    marked
      ? unmark(look.id, { ...look })
      : bookmark(look.id, {
          ...look,
        });
    setMarked(!marked);
  };
  useEffect(() => {
    if (userInfo.saved?.find((save) => save.id === look.id)) setMarked(true);
  }, []);
  return (
    <TouchableOpacity onPress={bookmarkHandler}>
      <FontAwesome
        name={marked ? 'bookmark' : 'bookmark-o'}
        size={iconSize}
        color="black"
        style={styles.postActionIcon}
      />
    </TouchableOpacity>
  );
});

const Post = React.memo(({ look, navigation, userInfo }) => {
  const currentUser = firebase.auth().currentUser;
  const [numOfLikes, setNumOfLikes] = useState(look.likes?.length);
  const clickEventListener = React.useCallback((item) => {
    navigation.navigate('Item', { fetchId: item.id });
  });
  const clickEventListenerOverlay = React.useCallback((look, navigation) => {
    navigation.navigate('Look', { images: look });
  });
  const profileClickHandler = () => {
    navigation.navigate('OtherProfile', { user: look.author });
  };

  const carouselOrGrid = look.coverImage ? (
    <PhotoCarousel
      data={[{ image: look.coverImage }, ...look.images]}
      clickEventListener={clickEventListener}
    />
  ) : (
    <PhotoGrid
      items={[...look.images]}
      clickEventListener={clickEventListener}
      navigation={navigation}
    />
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

          <FontText font="MYRIADPRO" style={styles.postHeaderProfileName}>
            {look.author.userName}
          </FontText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postHeaderSecond}>
          <Entypo name="dots-three-horizontal" size={wsize(24)} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.postDescription}>
        <FontText font="Rubik">{look.description}</FontText>
      </View>
      <View style={styles.postImageContainer}>{carouselOrGrid}</View>
      <View style={styles.postActionsContainer}>
        <View style={styles.postActionsLeft}>
          <HeartButton
            look={look}
            updateLikes={(val) => setNumOfLikes(numOfLikes + val)}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Comments', {
                photoUrl: currentUser.photoURL,
                postId: look.id,
              });
            }}>
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

        <BookmarkButton look={look} userInfo={userInfo} />
      </View>
      <View style={styles.likesContainer}>
        <FontText style={styles.likesText} font="Rubik">
          {numOfLikes} likes
        </FontText>
      </View>
      <View style={styles.postInfoContainer}>
        <TouchableOpacity onPress={profileClickHandler}>
          <FontText style={styles.profileName} font="Rubik">
            {look.author.userName}
          </FontText>
        </TouchableOpacity>
        {look.tags.map((tag, index) => {
          return <Tag title={tag} key={index} />;
        })}
      </View>
      <TouchableOpacity
        style={styles.viewComments}
        onPress={() => {
          navigation.navigate('Comments', {
            user: {
              id: currentUser.id,
              photoURL: currentUser.photoURL,
              displayName: currentUser.displayName,
            },
            postId: look.id,
          });
        }}>
        <FontText
          style={{ color: 'grey', fontWeight: 'bold', fontSize: wsize(13) }}
          font="Rubik">
          View all comments
        </FontText>
      </TouchableOpacity>
      <CommentForm photoUrl={currentUser.photoURL} postId={look.id} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  likesContainer: {
    paddingHorizontal: wsize(4),
    marginBottom: hsize(11),
  },
  likesText: {
    fontWeight: 'bold',
    fontSize: wsize(13),
  },
  profileName: {
    color: '#0148FF',
    fontWeight: 'bold',
  },
  viewComments: {
    marginLeft: wsize(2),
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
    fontWeight: 'bold',
    fontSize: wsize(14),
    marginLeft: wsize(9),
    color: '#262626',
  },
  postDescription: {
    width: '100%',
    padding: hsize(4),
  },
  postHeaderIcon: {
    width: wsize(34),
    height: wsize(34),
    borderRadius: wsize(17),
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
  postInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: wsize(2),
  },
});
export default Post;
