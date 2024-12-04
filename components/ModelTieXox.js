import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Image } from "expo-image";
import { usePlayMp3 } from "../customHooks/PlaySound";

const ModelTie = ({ isTie, close }) => {
  const play = usePlayMp3(require("../assets/sounds/clapping.mp3"));
  useEffect(() => {
    if (isTie) {
      play();
    }
  }, [isTie]);
  return (
    <Modal visible={isTie} animationType="slide" transparent>
      <View style={styles.modal}>
        <View style={styles.wrapper}>
          <Image
            source={require("../assets/images/clapping.gif")}
            style={styles.clap}
            contentFit="fill"
          />
          <View style={styles.textCOntainer}>
            <Text style={styles.text}>A Tie!</Text>
            <Text style={styles.text}>Not Bad!</Text>
          </View>

          <TouchableOpacity style={styles.closeContainer} onPress={close}>
            <Image
              source={require("../assets/images/delete.png")}
              style={styles.close}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModelTie;

const styles = StyleSheet.create({
  modal: {
    borderWidth: 2,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  wrapper: {
    width: "50%",
    height: "50%",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  clap: {
    width: "30%",
    aspectRatio: 1,
  },
  textCOntainer: {},
  text: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  close: {
    resizeMode: "stretch",
    width: 50,
    height: 50,
  },
});
