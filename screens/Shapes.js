import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import MainContainer from "../components/MainContainer";

import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";
const Shapes = ({ navigation }) => {
  const { fontSize, buttonFontColor, buttonSize } = useUserPreferences();
  const { sound } = useContext(Context);

  return (
    <MainContainer
      showBack={true}
      showSetting={false}
      addStyle={styles.container}
      navigation={navigation}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* buttons */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              transform: [{ scale: buttonSize * 0.8 }],
            },
          ]}
          onPress={() => {
            sound();

            navigation.navigate("ShapesBasic");
          }}
        >
          <ImageBackground
            source={require("../assets/images/buttongreen.png")}
            resizeMode="stretch"
            style={styles.buttonContainer}
          >
            <Text
              style={[
                styles.text,
                { fontSize: fontSize, color: buttonFontColor },
              ]}
            >
              Basic Shapes
            </Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              transform: [{ scale: buttonSize * 0.8 }],
            },
          ]}
          onPress={() => {
            sound();

            navigation.navigate("MatchShapes");
          }}
        >
          <ImageBackground
            source={require("../assets/images/buttonwhite.png")}
            resizeMode="stretch"
            style={styles.buttonContainer}
          >
            <Text
              style={[
                styles.text,
                { fontSize: fontSize, color: buttonFontColor },
              ]}
            >
              Recognize
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </MainContainer>
  );
};

export default Shapes;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  button: {
    width: 400,
    height: 100,
    marginVertical: 10,
  },
  buttonContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  text: {
    width: "100%",
    textAlign: "center",
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
