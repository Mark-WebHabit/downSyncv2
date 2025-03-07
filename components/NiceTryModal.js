import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React, { useState } from "react";

const NiceTryModal = ({ show = true, hide, next }) => {
  const [modalSize, setModalSize] = useState(0);

  return (
    <Modal
      style={styles.container}
      transparent
      animationType="fade"
      visible={show}
    >
      <View
        onLayout={(event) => setModalSize(event.nativeEvent.layout.width)}
        style={styles.container}
      >
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
        <View
          style={[
            styles.div,
            {
              width: modalSize,
            },
          ]}
        >
          <TouchableOpacity style={styles.nextContainer} onPress={next}>
            <Text
              style={[
                styles.next,
                {
                  width: 200,
                },
              ]}
            >
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
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
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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

  div: {
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  nextContainer: {
    alignItems: "flex-end",
  },
  next: {
    marginRight: 30,
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "red",
    borderRadius: 20,
    color: "white",
  },
});
