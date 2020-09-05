import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';

/*this is a react native version of this code https://github.com/Expertizo/react-fb-image-grid*/


export default function () {
  const [countFrom, setCountFrom] = useState(5);
  const [conditionalRender, setConditionalRender] = useState(false);
  const [images, setImages] = useState([
    'https://bootdey.com/img/Content/avatar/avatar1.png',
    'https://bootdey.com/img/Content/avatar/avatar6.png',
    'https://bootdey.com/img/Content/avatar/avatar8.png',
    'https://bootdey.com/img/Content/avatar/avatar7.png',
    'https://bootdey.com/img/Content/avatar/avatar5.png',
    'https://bootdey.com/img/Content/avatar/avatar6.png',
    'https://bootdey.com/img/Content/avatar/avatar4.png',
    'https://bootdey.com/img/Content/avatar/avatar1.png',
    'https://bootdey.com/img/Content/avatar/avatar2.png',
    'https://bootdey.com/img/Content/avatar/avatar3.png',
  ])
  const clickEventListener = () => {
    Alert.alert('Alert', 'image clicked');
  };

  const RenderOne = ({ images, clickEventListener }) => {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent1]}
          onPress={clickEventListener}>
          <Image style={styles.image} source={{ uri: images[0] }} />
        </TouchableOpacity>
      </View>
    );
  }


  const RenderTwo = ({ images, countFrom, clickEventListener }) => {
    const conditionalRender =
      [3, 4].includes(images.length) ||
      (images.length > +countFrom && [3, 4].includes(+countFrom));

    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent2]}
          onPress={() => {
            clickEventListener();
          }}>
          <Image
            style={styles.image}
            source={{ uri: conditionalRender ? images[1] : images[0] }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent2]}
          onPress={() => {
            clickEventListener();
          }}>
          <Image
            style={styles.image}
            source={{ uri: conditionalRender ? images[2] : images[1] }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const RenderThree = ({ images, countFrom, clickEventListener }) => {
    const overlay =
      !countFrom ||
        countFrom > 5 ||
        (images.length > countFrom && [4, 5].includes(+countFrom))
        ? <RenderCountOverlay more images={images} countFrom={countFrom} clickEventListener={clickEventListener} conditionalRender={conditionalRender} />
        : <RenderCountOverlay images={images} countFrom={countFrom} clickEventListener={clickEventListener} conditionalRender={conditionalRender} />;
    const conditionalRender =
      images.length == 4 || (images.length > +countFrom && +countFrom == 4);

    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent3]}
          onPress={() => {
            clickEventListener();
          }}>
          <Image
            style={styles.image}
            source={{ uri: conditionalRender ? images[1] : images[2] }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent3]}
          onPress={() => {
            clickEventListener();
          }}>
          <Image
            style={styles.image}
            source={{ uri: conditionalRender ? images[2] : images[3] }}
          />
        </TouchableOpacity>
        {overlay}
      </View>
    );
  }

  const RenderOverlay = ({ images, clickEventListener }) => {
    return (
      <TouchableOpacity
        style={[styles.imageContent, styles.imageContent3]}
        onPress={() => {
          clickEventListener();
        }}>
        <Image
          style={styles.image}
          source={{ uri: images[images.length - 1] }}
        />
      </TouchableOpacity>
    );
  }

  const RenderCountOverlay = ({ more, images, countFrom, clickEventListener }) => {
    const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);
    const conditionalRender =
      images.length == 4 || (images.length > +countFrom && +countFrom == 4);
    return (
      <TouchableOpacity
        style={[styles.imageContent, styles.imageContent3]}
        onPress={() => {
          clickEventListener();
        }}>
        <Image
          style={styles.image}
          source={{ uri: conditionalRender ? images[3] : images[4] }}
        />
        <View style={styles.overlayContent}>
          <View>
            <Text style={styles.count}>+{extra}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  const imagesToShow = [...images];

  if (countFrom && images.length > countFrom) {
    imagesToShow.length = countFrom;
  }

  return (
    <View style={styles.container}>
      {[1, 3, 4].includes(imagesToShow.length) && <RenderOne clickEventListener={clickEventListener} images={images} />}
      {imagesToShow.length >= 2 &&
        imagesToShow.length != 4 &&
        <RenderTwo clickEventListener={clickEventListener} countFrom={countFrom} images={images} />}
      {imagesToShow.length >= 4 && <RenderThree clickEventListener={clickEventListener} countFrom={countFrom} images={images} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
  },
  imageContent: {
    borderWidth: 1,
    borderColor: 'black',
    height: 120,
  },
  imageContent1: {
    width: '100%',
  },
  imageContent2: {
    width: '50%',
  },
  imageContent3: {
    width: '33.33%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  //overlay efect
  overlayContent: {
    flex: 1,
    position: 'absolute',
    zIndex: 100,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 50,
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 139, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
