import React, { useState, useContext } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacityBase,
} from 'react-native';
import { wsize, hsize } from '../entities/constants';
import { BlurView } from 'expo-blur';
import { Feather, AntDesign } from '@expo/vector-icons';
import Option from './Option';
import { isPrivateUser } from '../services/api/user';
export default React.memo(function UserModal({
  setModalVisible,
  navigation,
  ...props
}) {
  const requests = (
    <Option
      title="Look Requests"
      setModalVisible={setModalVisible}
      navigation={navigation}
      navigateTo="FollowRequests">
      <AntDesign
        name="adduser"
        size={29}
        color="black"
        style={styles.iconStyle}
      />
    </Option>
  );
  return (
    <Modal animationType="fade" transparent={true} {...props}>
      <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}>
          <View style={styles.closeButton}></View>
        </TouchableOpacity>
        <View style={styles.modalView}>
          <Option
            title="Settings"
            setModalVisible={setModalVisible}
            navigation={navigation}
            navigateTo="Settings">
            <Feather
              name="settings"
              size={29}
              color="black"
              style={styles.iconStyle}
            />
          </Option>
          <Option
            title="Add Friends"
            setModalVisible={setModalVisible}
            navigation={navigation}
            navigateTo="AddFriend">
            <AntDesign
              name="adduser"
              size={29}
              color="black"
              style={styles.iconStyle}
            />
          </Option>
          {requests}
        </View>
      </BlurView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    height: hsize(307),
    // marginTop: hsize(307),

    width: wsize(375),
  },
  modalView: {
    width: wsize(375),
    height: hsize(537),
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: hsize(51),
  },
  modalOptionText: {
    fontSize: wsize(18),
    marginLeft: wsize(19),
  },
  iconStyle: {
    marginRight: wsize(24),
  },
  modalText: {
    marginBottom: wsize(15),
    textAlign: 'center',
  },
});
