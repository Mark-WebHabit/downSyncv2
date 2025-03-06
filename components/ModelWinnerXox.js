import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Image } from "expo-image";
import { usePlayMp3 } from "../customHooks/PlaySound";
import LottieView from "lottie-react-native";
const ModelWinnerXox = ({ showWinner, close, winner, tryAgain }) => {
  const play = usePlayMp3(require("../assets/sounds/win.mp3"));

  useEffect(() => {
    if (winner) {
      play();
    }
  }, [winner]);
  return (
    <Modal visible={showWinner} animationType="slide" transparent>
      <LottieView
        source={require("../assets/images/confetti.json")}
        autoPlay={true}
        loop={false}
        style={styles.lottie}
      />
      <View style={styles.modal}>
        <View style={styles.wrapper}>
          <Image
            source={require("../assets/images/clapping.gif")}
            style={styles.clap}
            contentFit="fill"
          />
          <View style={styles.textCOntainer}>
            <Text style={styles.text}>Winner</Text>
            {winner == "x" ? (
              <Image
                source={require("../assets/images/x.png")}
                style={styles.winner}
              />
            ) : (
              <Image
                source={require("../assets/images/o.png")}
                style={styles.winner}
              />
            )}
          </View>

          <TouchableOpacity style={styles.closeContainer} onPress={close}>
            <Image
              source={require("../assets/images/delete.png")}
              style={styles.close}
              contentFit="fill"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tryAgain}>
          <TouchableOpacity style={styles.tryAgainWrapper} onPress={tryAgain}>
            <Text style={styles.tryAgainText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModelWinnerXox;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  wrapper: {
    width: "50%",
    height: "50%",
    backgroundColor: "white",
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
    width: 50,
    height: 50,
  },
  winner: {
    width: 50,
    height: 50,
    marginHorizontal: "auto",
  },

  tryAgain: {
    width: 360,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  tryAgainWrapper: {
    marginBottom: 10,
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "green",
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  lottie: {
    width: "100%",
    height: "300%",
    top: -300,
    position: "absolute",
  },
});
