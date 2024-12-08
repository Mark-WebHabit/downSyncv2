import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
} from "react-native";
import useUserPreferences from "../customHooks/useUserPreference";
import React, { useContext, useEffect } from "react";
import { Context } from "../DataContext";

const SettinModal = ({ redirect }) => {
  const { fontSize, buttonFontColor, buttonSize } = useUserPreferences();
  const { sound } = useContext(Context);

  return (
    <View style={styles.settingContainerButton}>
      {/* btn 1 */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            transform: [{ scale: buttonSize }],
          },
        ]}
        onPress={() => {
          sound();
          redirect("Setting");
        }}
      >
        <ImageBackground
          style={styles.buttonWrapper}
          source={require("../assets/images/buttonwhite.png")}
          resizeMode="stretch"
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: buttonFontColor,
                fontSize: fontSize,
                fontWeight: "500",
              },
            ]}
          >
            Settings
          </Text>
        </ImageBackground>
      </TouchableOpacity>

      {/* btn2 */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            transform: [{ scale: buttonSize }],
          },
        ]}
        onPress={() => {
          redirect("Dashboard");
        }}
      >
        <ImageBackground
          style={styles.buttonWrapper}
          source={require("../assets/images/buttonblue.png")}
          resizeMode="stretch"
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: buttonFontColor,
                fontSize: fontSize,
                fontWeight: "500",
              },
            ]}
          >
            Progress
          </Text>
        </ImageBackground>
      </TouchableOpacity>

      {/* btn3 */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            transform: [{ scale: buttonSize }],
          },
        ]}
        onPress={() => {
          BackHandler.exitApp();
        }}
      >
        <ImageBackground
          style={styles.buttonWrapper}
          source={require("../assets/images/buttongreen.png")}
          resizeMode="stretch"
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: buttonFontColor,
                fontSize: fontSize,
                fontWeight: "500",
              },
            ]}
          >
            Exit
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default SettinModal;

const styles = StyleSheet.create({
  settingContainerButton: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: "auto",
    zIndex: 1,
  },
  button: {
    width: "80%",
    height: 70,
    borderRadius: 20,
    overflow: "hidden",
  },
  buttonWrapper: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    width: "100%",
    textAlign: "center",
  },
});
