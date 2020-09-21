import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { window, wsize, hsize } from '../../entities/constants';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import TextButton from '../../components/TextButton';
import Tag from '../../components/Tag';
import { getItemById } from '../../services/api/item';
import LoadingScreen from '../OtherScreens/LoadingScreen';
export default React.memo(({ route }) => {
  const iconSize = wsize(26);
  const [item, setItem] = useState(null);
  const [display, setDisplay] = useState('none');
  useEffect(() => {
    const { image, brand, title, info, tags, fetchId } = route.params;
    if (fetchId) getItemById(fetchId).then(item => {setItem(item) });
    else setItem({ image, brand, title, info, tags });
  }, []);
  if (!item) return <LoadingScreen fullscreen />;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.postContainer}>
        <View style={styles.postImageContainer}>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.postImage}
          />
        </View>
        <View style={styles.postInfoContainer}>
          <Text style={styles.postTitle}>{item.name}</Text>
          <Text style={styles.postBrand}>{item.brand}</Text>
          <View style={[styles.toggleableContainer, { display: display }]}>
            <Text style={styles.postPrice}>{item.info?.price}</Text>
            <Text style={styles.postDescription}>{item.info?.description}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.postPublisher}>added by</Text>
              <TextButton style={styles.postPublisherLink}>
                {item.info.userName}
              </TextButton>
            </View>
          </View>
          <View style={styles.postActions}>
            <TouchableOpacity
              onPress={() => {
                if (display === 'none') {
                  setDisplay('flex');
                } else {
                  setDisplay('none');
                }
              }}>
              <AntDesign name="infocirlce" size={iconSize} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="link" size={iconSize} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="bookmark" size={iconSize} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {item.tags.map((tag, index) => (<Tag title={tag} key={index} />))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: hsize(30),
  },
  postContainer: {
    justifyContent: 'center',
  },
  postImageContainer: {
    alignItems: 'center',
  },
  postImage: {
    width: wsize(288),
    height: hsize(219),
  },
  postInfoContainer: {
    alignItems: 'center',
  },
  postTitle: {
    marginTop: hsize(40),
    fontWeight: 'bold',
    fontSize: wsize(22),
    color: '#262626',
  },
  postBrand: {
    fontSize: wsize(22),
  },
  toggleableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  postPrice: {
    fontSize: wsize(22),
  },
  postDescription: {
    marginTop: hsize(8),
    marginHorizontal: wsize(40), //should be fixed
    fontSize: wsize(19.5),
    textAlign: 'center',
  },
  postPublisher: {
    fontSize: wsize(19.5),
    color: '#979797',
  },
  postPublisherLink: {
    fontSize: wsize(19.5),
  },
  postActions: {
    flexDirection: 'row',
    width: wsize(306),
    justifyContent: 'space-between',
    marginVertical: hsize(13),
    paddingVertical: hsize(13),
  },
});
