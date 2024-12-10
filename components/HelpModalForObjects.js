import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HelpModal = ({ visible, onClose }) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Icon name="info-circle" size={50} color="blue" />
          <Text style={styles.modalText}>How to Play</Text>
          <Text style={styles.instructionsText}>
            1. Press and hold the small box next to the text.
            {"\n"}
            2. Drag your finger to the top of the matching image.
            {"\n"}
            3. Lift your finger to complete the connection!
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 4,
  },
  modalText: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "bold",
  },
  instructionsText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default HelpModal;
