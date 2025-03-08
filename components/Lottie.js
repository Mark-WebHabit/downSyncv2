import { StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
const Lottie = () => {
  return (
    <LottieView
      source={require("../assets/images/confetti.json")}
      autoPlay={true}
      loop={false}
      style={styles.lottie}
    />
  );
};

export default Lottie;

const styles = StyleSheet.create({
  lottie: {
    width: "100%",
    height: "300%",
    top: -300,
    position: "absolute",
    zIndex: 10,
  },
});
