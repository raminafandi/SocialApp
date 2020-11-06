import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
export default React.memo(function ({
  images: propImages,
  items,
  gridStyle,
  clickEventListener,
  // navigation,
  fromProfile,
  imageStyle,
  small,
  ...props
}) {
  const [countFrom, setCountFrom] = useState(5);
  const images = items ? items.map((item) => item.image) : propImages;
  const RenderOne = React.memo(({ images, clickEventListener }) => {
    return (
      <View style={styles.row}>
        <TouchableWithoutFeedback
          disabled
          onPress={() => clickEventListener(items[0])}>
          <View style={[styles.imageContent, { height: small ? 60 : 120 }, styles.imageContent1]}>
            <Image
              style={[styles.image, imageStyle]}
              source={{ uri: images[0] }}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  });

  const RenderTwo = React.memo(({ images, countFrom, clickEventListener }) => {
    const conditionalRender =
      [3, 4].includes(images.length) ||
      (images.length > +countFrom && [3, 4].includes(+countFrom));

    return (
      <View style={styles.row}>
        <TouchableWithoutFeedback
          disabled
          onPress={() => {
            items &&
              clickEventListener(conditionalRender ? items[1] : items[0]);
          }}>
          <View style={[styles.imageContent, { height: small ? 60 : 120 }, styles.imageContent2]}>
            <Image
              style={[styles.image, imageStyle]}
              source={{ uri: conditionalRender ? images[1] : images[0] }}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          disabled
          onPress={() => {
            items &&
              clickEventListener(conditionalRender ? items[2] : items[1]);
          }}>
          <View style={[styles.imageContent, { height: small ? 60 : 120 }, styles.imageContent2]}>
            <Image
              style={[styles.image, imageStyle]}
              source={{ uri: conditionalRender ? images[2] : images[1] }}
              resizeMode="contain"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  });

  const RenderThree = React.memo(
    ({ images, countFrom, clickEventListener }) => {
      const overlay =
        !countFrom ||
          countFrom > 5 ||
          (images.length > countFrom && [4, 5].includes(+countFrom)) ? (
            <RenderCountOverlay
              more
              images={images}
              countFrom={countFrom}
              clickEventListener={clickEventListener}
              conditionalRender={conditionalRender}
            />
          ) : (
            <RenderCountOverlay
              images={images}
              countFrom={countFrom}
              clickEventListener={clickEventListener}
              conditionalRender={conditionalRender}
            />
          );
      const conditionalRender =
        images.length == 4 || (images.length > +countFrom && +countFrom == 4);

      return (
        <View style={styles.row}>
          <TouchableWithoutFeedback
            disabled
            onPress={() => {
              items &&
                clickEventListener(conditionalRender ? items[1] : items[2]);
            }}>
            <View style={[styles.imageContent, { height: small ? 60 : 120 }, styles.imageContent3]}>
              <Image
                style={[styles.image, imageStyle]}
                source={{ uri: conditionalRender ? images[1] : images[2] }}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            disabled
            onPress={() => {
              items &&
                clickEventListener(conditionalRender ? items[2] : items[3]);
            }}>
            <View style={[styles.imageContent, { height: small ? 60 : 120 }, styles.imageContent3]}>
              <Image
                style={[styles.image, imageStyle]}
                source={{ uri: conditionalRender ? images[2] : images[3] }}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
          {overlay}
        </View>
      );
    }
  );

  const RenderOverlay = React.memo(({ images, clickEventListener }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          clickEventListener();
        }}>
        <View style={[styles.imageContent, { height: small ? 60 : 120 }, styles.imageContent3]}>
          <Image
            style={[styles.image, imageStyle]}
            source={{ uri: images[images.length - 1] }}
            resizeMode="contain"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  });

  const RenderCountOverlay = React.memo(
    ({
      more,
      images,
      countFrom,
      clickEventListener,
      clickEventListenerOverlay,
    }) => {
      const extra =
        images.length - (countFrom && countFrom > 5 ? 5 : countFrom);
      const conditionalRender =
        images.length == 4 || (images.length > +countFrom && +countFrom == 4);
      return (
        <TouchableWithoutFeedback
          disabled
          onPress={() => {
            !fromProfile
              ? navigation.navigate('Look', {
                screen: 'Look',
                params: {
                  items: items,
                },
              })
              : navigation.navigate('Look', { items: items });
          }}>
          <View style={[styles.imageContent, { height: small ? 60 : 120 }, styles.imageContent3]}>
            <Image
              style={[styles.image, imageStyle]}
              source={{ uri: conditionalRender ? images[3] : images[4] }}
              resizeMode="contain"
            />
            <View style={styles.overlayContent}>
              <View>
                <Text style={styles.count}>+{extra + 2}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  );
  const imagesToShow = [...images];
  const navigation = useNavigation();
  if (countFrom && images.length > countFrom) {
    imagesToShow.length = countFrom;
  }
  return (
    <TouchableWithoutFeedback
      style={gridStyle}
      disabled
      onPress={() => {
        // clickEventListener()
        fromProfile
          // ? console.log('fromProfile')
          ? clickEventListener()
          // ? navigation.navigate('Look', {
          //     screen: 'Look',
          //     params: {
          //       items: items,
          //     },
          //   })
          // : console.log("NOT fromProfile")
          : navigation.navigate('Look', {
            screen: 'Look',
            params: {
              items 
            }
          });
      }}>
      <View style={[styles.container, gridStyle]}>
        {[1, 3, 4].includes(imagesToShow.length) && (
          <RenderOne clickEventListener={clickEventListener} images={images} />
        )}
        {imagesToShow.length >= 2 && imagesToShow.length != 4 && (
          <RenderTwo
            clickEventListener={clickEventListener}
            countFrom={countFrom}
            images={images}
          />
        )}
        {imagesToShow.length >= 4 && (
          <RenderThree
            clickEventListener={clickEventListener}
            countFrom={countFrom}
            images={images}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  imageContent: {
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
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 139, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
