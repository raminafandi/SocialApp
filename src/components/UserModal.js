import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Modal } from 'react-native';
import { wsize, hsize } from '../entities/constants';
import { BlurView } from 'expo-blur';
import { Feather, AntDesign } from '@expo/vector-icons';

export default React.memo(function UserModal({ setModalVisible, ...props }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      {...props}
    >
      <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalOption}>
              <Feather name="settings" size={29} color="black" />
              <Text style={styles.modalOptionText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <AntDesign name="adduser" size={29} color="black" />
              <Text style={styles.modalOptionText}>Add Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setModalVisible(false);
              }}>
              <AntDesign name="caretdown" size={29} color="black" />
              <Text style={styles.modalOptionText}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
})

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    width: wsize(375),
    height: hsize(537),
    backgroundColor: 'white',
    marginTop: hsize(307),
    borderRadius: 20,
    paddingTop: hsize(51),
  },
  modalOptionText: {
    fontSize: wsize(18),
    marginLeft: wsize(19),
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DADBDA',
    padding: wsize(4),
    paddingLeft: wsize(19),
  },
  modalOptionText: {
    fontSize: wsize(18),
    marginLeft: wsize(19),
  },
});
