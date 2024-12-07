import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React from "react";

const UpdateUsernameModal = ({
  modalVisible,
  newUsername,
  setNewUsername,
  errorMessage,
  setErrorMessage,
  setModalVisible,
  handleUsernameChange,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Enter New Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={newUsername}
            onChangeText={setNewUsername}
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={[styles.button, styles.buttonCancel]}
              onPress={() => {
                setErrorMessage("");
                setNewUsername("");
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.button, styles.buttonUpdate]}
              onPress={handleUsernameChange}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateUsernameModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "#f44336",
  },
  buttonUpdate: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
