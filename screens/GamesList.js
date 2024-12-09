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

const GamesList = ({ navigation }) => {
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
              transform: [{ scale: buttonSize }],
            },
          ]}
          onPress={() => {
            sound();

            navigation.navigate("Games");
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
              Games
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              transform: [{ scale: buttonSize }],
            },
          ]}
          onPress={() => {
            sound();

            navigation.navigate("Animals");
          }}
        >
          <ImageBackground
            source={require("../assets/images/buttonmint.png")}
            resizeMode="stretch"
            style={styles.buttonContainer}
          >
            <Text
              style={[
                styles.text,
                { fontSize: fontSize, color: buttonFontColor },
              ]}
            >
              Animals
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              transform: [{ scale: buttonSize }],
            },
          ]}
          onPress={() => {
            sound();
            navigation.navigate("Numbers");
          }}
        >
          <ImageBackground
            source={require("../assets/images/buttonblue.png")}
            resizeMode="stretch"
            style={styles.buttonContainer}
          >
            <Text
              style={[
                styles.text,
                { fontSize: fontSize, color: buttonFontColor },
              ]}
            >
              Numbers
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              transform: [{ scale: buttonSize }],
            },
          ]}
          onPress={() => {
            sound();
            navigation.navigate("Words");
          }}
        >
          <ImageBackground
            source={require("../assets/images/buttonmint.png")}
            resizeMode="stretch"
            style={styles.buttonContainer}
          >
            <Text
              style={[
                styles.text,
                { fontSize: fontSize, color: buttonFontColor },
              ]}
            >
              Words
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              transform: [{ scale: buttonSize }],
            },
          ]}
          onPress={() => {
            sound();
            navigation.navigate("Emotions");
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
              Emotions
            </Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              transform: [{ scale: buttonSize }],
            },
          ]}
          onPress={() => {
            sound();
            navigation.navigate("Arts");
          }}
        >
          <ImageBackground
            source={require("../assets/images/buttonmint.png")}
            resizeMode="stretch"
            style={styles.buttonContainer}
          >
            <Text
              style={[
                styles.text,
                { fontSize: fontSize, color: buttonFontColor },
              ]}
            >
              Arts
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </MainContainer>
  );
};

export default GamesList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 300,
    height: 80,
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
