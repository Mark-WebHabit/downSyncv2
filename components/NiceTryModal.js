import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React from "react";

const NiceTryModal = ({ show = true, hide }) => {
  return (
    <Modal
      style={styles.container}
      transparent
      animationType="fade"
      visible={show}
    >
      <View style={styles.container}>
        <Image
          style={styles.clapping}
          source={require("../assets/images/clapping.gif")}
          contentFit="contain"
        />
        <Text style={styles.text}>Well Done!</Text>

        <TouchableOpacity
          style={{ position: "absolute", top: 5, right: 5 }}
          onPress={() => hide()}
        >
          <Image
            source={require("../assets/images/delete.png")}
            style={{ height: 30, width: 30 }}
            contentFit="fill"
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default NiceTryModal;

const styles = StyleSheet.create({
  container: {
    height: "50%",
    aspectRatio: 4 / 1.7,
    margin: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  clapping: {
    height: "80%",
    aspectRatio: 1,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
});
