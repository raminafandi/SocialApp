import React, { useState, useEffect, useContext, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Button as ButtonReact,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import LoadingScreen from '../../OtherScreens/LoadingScreen';
import Button from '../../../components/Button';
import { window, wsize, hsize } from '../../../entities/constants';
import Tag from '../../../components/Tag';
import { HeaderBackButton } from '@react-navigation/stack';
import PhotoGrid from '../../../components/PhotoGrid';
import BackButton from './BackButton';
import { ItemContext } from '../../../services/context/ItemContext';
import * as ImagePicker from 'expo-image-picker';
import { addLook } from '../../../services/api/look';
import TextButton from '../../../components/TextButton';

const RenderedPhotoGrid = memo(
  ({ selectedItems, clickEventListener, navigation, ...props }) => {
    return (
      <PhotoGrid
        items={selectedItems}
        clickEventListener={clickEventListener}
        navigation={navigation}
        {...props}
      />
    );
  }
);

export default React.memo(({ route, navigation }) => {
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const itemContext = useContext(ItemContext);
  const clearSelectedItems = itemContext.clearSelectedItems;
  const selectedItems = itemContext.selectedItems;
  const renderingTags = itemContext.tags.map((item, index) => {
    return (
      <Tag
        title={item}
        key={index}
        deleteButton={true}
        deleteHandler={() => {
          itemContext.setTags(
            itemContext.tags.filter((itemw) => itemw !== item)
          );
        }}
      />
    );
  });
  const submitHandler = () => {
    setLoading(true);
    addLook({
      images: selectedItems,
      description: itemContext.text,
      tags: itemContext.tags,
      coverImage: itemContext.coverImage,
    }).then(() => {
      Alert.alert('Completed!', 'Look has successfully added');
      clearSelectedItems();
      setLoading(false);
      navigation.goBack();
    });
  };
  const galeryHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      itemContext.setCoverImage(result.uri);
    }
  };
  navigation.setOptions({
    headerLeft: (props) => (
      <BackButton
        {...props}
        onPress={clearSelectedItems}
        navigation={navigation}
      />
    ),
    headerRight: () => (
      <TextButton
        onPress={() => {
          checkFields(itemContext.text);
          navigation.navigate('Home');
        }}
        style={{ marginRight: wsize(10) }}>
        Add Look
      </TextButton>
    ),
  });
  const checkFields = (text) => {
    if (text === '') {
      Alert.alert('All Fields should be filled. ', '');
    } else {
      submitHandler();
    }
  };
  if (loading) return <LoadingScreen fullscreen />;
  return (
    <View>
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Say something meaningful..."
          value={itemContext.text}
          onChangeText={(text) => itemContext.setText(text)}
          style={styles.input}
          maxLength={200}
        />
        <View style={styles.photoGrid}>
          {
            <RenderedPhotoGrid
              selectedItems={selectedItems}
              navigation={navigation}
            />
          }
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add Tags..."
            value={tag}
            onChangeText={(text) => {
              setTag(text);
            }}
            maxLength={30}
            onSubmitEditing={() => {
              if (tag !== '') {
                itemContext.setTags([...itemContext.tags, tag]);
                setTag('');
              }
            }}
            style={styles.tagsInput}
          />
          <TouchableOpacity
            style={styles.enterButton}
            onPress={() => {
              if (tag !== '') {
                itemContext.setTags([...itemContext.tags, tag]);
                setTag('');
              }
            }}>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.tagsContainer}>{renderingTags}</View>

        <View>
          <Button
            title="add item"
            style={styles.buttonStyle}
            titleStyle={styles.buttonTitleStyle}
            onPress={navigation.goBack}
            disabled={itemContext.selectedItems.length === 10 ? true : false}
          />
          <Button
            title="add cover"
            style={[styles.buttonStyle, { backgroundColor: '#0148FF' }]}
            titleStyle={[styles.buttonTitleStyle]}
            onPress={galeryHandler}
          />
        </View>
        <View
          style={{
            alignSelf: 'center',
            marginTop: hsize(20),
            marginBottom: hsize(50),
          }}>
          {itemContext.coverImage ? (
            <Image
              source={{ uri: itemContext.coverImage }}
              resizeMode="contain"
              style={{ width: wsize(338), height: hsize(200) }}
            />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: hsize(24),
  },
  input: {
    borderColor: 'black',
    backgroundColor: '#fafafa',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    width: wsize(338),
    height: hsize(56),
    justifyContent: 'center',
    marginBottom: hsize(14),
    paddingHorizontal: wsize(17),
  },
  photoGrid: {
    width: wsize(338),
    alignSelf: 'center',
  },
  buttonStyle: {
    width: wsize(332),
    height: hsize(50),
    backgroundColor: '#52BDEB',
  },
  buttonTitleStyle: {
    color: 'white',
    fontSize: wsize(22),
    fontWeight: '500',
  },
  tags: { flexDirection: 'row', marginLeft: wsize(24) },
  inputContainer: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#DADBDA',
    paddingHorizontal: wsize(10),
    height: hsize(33),
    borderRadius: wsize(5),
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingStart: wsize(17),
    flexDirection: 'row',
  },
  tagsInput: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  enterButton: {
    borderLeftWidth: 1,
    borderLeftColor: '#DADBDA',
    height: hsize(33),
    width: wsize(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: wsize(260),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hsize(25),
  },
});
