import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useContext,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Animated,
  ImageBackground,
} from 'react-native';
import { DraggableGrid } from 'react-native-draggable-grid';
import { window, wsize, hsize } from '../../../entities/constants';
import { ItemContext } from '../../../services/context/ItemContext';
import { HeaderBackButton } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default React.memo(({ navigation, route }) => {
  const { items } = route.params;
  const { dragSelectedItems } = useContext(ItemContext);
  const [localItems, setLocalItems] = useState(
    items.map((item) => ({ name: item.image, key: item.id }))
  );
  const renderItem = ({ name, key }) => {
    return (
      <View key={key}>
        <ImageBackground source={{ uri: name }} style={styles.img}>
          <TouchableOpacity
            onPress={() => {}}
            style={{ justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
            <MaterialIcons name="cancel" size={20} color="red" />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  };
  navigation.setOptions({
    headerLeft: (props) => (
      <HeaderBackButton
        {...props}
        onPress={() => {
          dragSelectedItems(
            localItems.map((item) => ({ image: item.name, id: item.key }))
          );
          navigation.goBack();
        }}
        navigation={navigation}
      />
    ),
  });
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Entypo
          name="info-with-circle"
          size={22}
          color="#52BDEB"
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>
          Press and hold, then drag item for changing order of the grid
        </Text>
      </View>
      <DraggableGrid
        numColumns={3}
        data={localItems}
        style={styles.list}
        renderItem={renderItem}
        onDragRelease={(data) => setLocalItems(data)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hsize(30),
    backgroundColor: 'white',
  },
  list: {
    marginTop: hsize(31),
    marginHorizontal: wsize(5),
  },
  img: {
    width: wsize(125),
    height: wsize(125),
    borderWidth: 1,
    borderColor: 'white',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 16,
  },
});
