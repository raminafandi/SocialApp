import React from 'react';
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

const ItemScreen = ({ route }) => {
  const iconSize = wsize(26);
  const { image, brand, title, info } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.postContainer}>
          <View style={styles.postImageContainer}>
            <Image
              source={{
                uri: image,
              }}
              style={styles.postImage}
            />
          </View>
          <View style={styles.postInfoContainer}>
            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postBrand}>{brand}</Text>
            <Text style={styles.postPrice}>{info.price}</Text>
            <Text style={styles.postDescription}>{info.description}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.postPublisher}>added by</Text>
              <TextButton style={styles.postPublisherLink}>{info.userName}</TextButton>
            </View>
            <View style={styles.postActions}>
              <TouchableOpacity>
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
              <Tag title="Sunglasses" />
              <Tag title="Gold" />
              <Tag title="ASOS" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
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
export default ItemScreen;
