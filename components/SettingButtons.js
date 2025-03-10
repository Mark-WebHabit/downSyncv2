import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";

const SettingButtons = ({ toggleSetting, showBack, showSetting, goBack }) => {
  return (
    <View style={styles.buttonContainer}>
      {/* buttons */}
      {showBack && (
        <TouchableOpacity onPress={goBack}>
          <ImageBackground
            source={require("../assets/images/button.png")}
            style={styles.buttonBg}
          >
            <Image source={require("../assets/images/back.png")} />
          </ImageBackground>
        </TouchableOpacity>
      )}

      {showSetting && (
        <TouchableOpacity onPress={toggleSetting}>
          <ImageBackground
            source={require("../assets/images/button.png")}
            style={styles.buttonBg}
          >
            <Image source={require("../assets/images/setting.png")} />
          </ImageBackground>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SettingButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    top: 5,
    left: 10,
    gap: 5,
    zIndex: 2,
  },
  buttonBg: {
    padding: 5,
  },
});
