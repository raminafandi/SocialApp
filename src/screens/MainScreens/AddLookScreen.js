import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import Button from '../../components/Button';
import { window, wsize, hsize } from '../../entities/constants';
import Input from '../../components/Input';
import Tag from '../../components/Tag';
import { HeaderBackButton } from '@react-navigation/stack';
import PhotoGrid from './PhotoGrid';
export default React.memo(({ route, navigation }) => {
  const [text, setText] = useState('');
  const { selectedItems } = route.params;
  const submitHandler = () => {

  }
  navigation.setOptions({
    headerLeft: (props) => (
      <HeaderBackButton
        {...props}
        onPress={() => {
          navigation.navigate('Album', { clearSelectedItems: true })
        }}
      />
    ),
    headerRight: () => (
      <ButtonReact title="Publish" onPress={submitHandler} />
    )
  })
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Say something meaningful..."
          value={text}
          onChangeText={(text) => setText(text)}
          style={styles.input}
          maxLength={200}
        />
        <View style={styles.photoGrid}>
          <PhotoGrid images={selectedItems.map(item => item.image)} clickEventListener={() => console.log('click')} />
        </View>
        <View style={styles.tags}>
          <Tag title="Sunglasses" />
          <Tag title="Gold" />
          <Tag title="ASOS" />
        </View>
        <View>
          <Button
            title="add item"
            style={styles.buttonStyle}
            titleStyle={styles.buttonTitleStyle}
            onPress={navigation.goBack}
          />
          <Button
            title="add cover"
            style={[styles.buttonStyle, { backgroundColor: '#0148FF' }]}
            titleStyle={[styles.buttonTitleStyle]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});