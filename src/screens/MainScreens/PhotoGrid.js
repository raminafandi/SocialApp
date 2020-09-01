import React from 'react';
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

export default class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countFrom: 5,
      conditionalRender: false,
      images: [
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
      ],
    };
  }

  clickEventListener = () => {
    Alert.alert('Alert', 'image clicked');
  };

  renderOne() {
    const { images } = this.state;
    const { countFrom } = this.state;
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent1]}
          onPress={() => {
            this.clickEventListener();
          }}>
          <Image style={styles.image} source={{ uri: images[0] }} />
        </TouchableOpacity>
      </View>
    );
  }

  renderTwo() {
    const { images } = this.state;
    const { countFrom } = this.state;
    const conditionalRender =
      [3, 4].includes(images.length) ||
      (images.length > +countFrom && [3, 4].includes(+countFrom));

    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent2]}
          onPress={() => {
            this.clickEventListener();
          }}>
          <Image
            style={styles.image}
            source={{ uri: conditionalRender ? images[1] : images[0] }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent2]}
          onPress={() => {
            this.clickEventListener();
          }}>
          <Image
            style={styles.image}
            source={{ uri: conditionalRender ? images[2] : images[1] }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderThree() {
    const { images } = this.state;
    const { countFrom } = this.state;
    const overlay =
      !countFrom ||
      countFrom > 5 ||
      (images.length > countFrom && [4, 5].includes(+countFrom))
        ? this.renderCountOverlay(true)
        : this.renderOverlay();
    const conditionalRender =
      images.length == 4 || (images.length > +countFrom && +countFrom == 4);

    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent3]}
          onPress={() => {
            this.clickEventListener();
          }}>
          <Image
            style={styles.image}
            source={{ uri: conditionalRender ? images[1] : images[2] }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.imageContent, styles.imageContent3]}
          onPress={() => {
            this.clickEventListener();
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

  renderOverlay() {
    const { images } = this.state;
    return (
      <TouchableOpacity
        style={[styles.imageContent, styles.imageContent3]}
        onPress={() => {
          this.clickEventListener();
        }}>
        <Image
          style={styles.image}
          source={{ uri: images[images.length - 1] }}
        />
      </TouchableOpacity>
    );
  }

  renderCountOverlay(more) {
    const { images } = this.state;
    const { countFrom } = this.state;
    const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);
    const conditionalRender =
      images.length == 4 || (images.length > +countFrom && +countFrom == 4);
    return (
      <TouchableOpacity
        style={[styles.imageContent, styles.imageContent3]}
        onPress={() => {
          this.clickEventListener();
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

  render() {
    const { modal, index, countFrom } = this.state;
    const { images } = this.state;
    const imagesToShow = [...images];

    if (countFrom && images.length > countFrom) {
      imagesToShow.length = countFrom;
    }

    return (
      <View style={styles.container}>
        {[1, 3, 4].includes(imagesToShow.length) && this.renderOne()}
        {imagesToShow.length >= 2 &&
          imagesToShow.length != 4 &&
          this.renderTwo()}
        {imagesToShow.length >= 4 && this.renderThree()}
      </View>
    );
  }
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
