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

const ThingsList = ({ navigation }) => {
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

            navigation.navigate("SchoolSupplies");
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
              School
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

            navigation.navigate("Wearables");
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
              Wearables
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

            navigation.navigate("Household");
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
              Household
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </MainContainer>
  );
};

export default ThingsList;

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
