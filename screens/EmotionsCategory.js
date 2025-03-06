import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";

import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";
import { EmotionContext } from "../GroupContext/EmotionContext";
import SplashScreen from "./SplashScreen";

const EmotionsCategory = ({ navigation }) => {
  const [doneFetching, setDoneFetching] = useState(false);
  const { fontSize, buttonFontColor, buttonSize } = useUserPreferences();
  const { sound } = useContext(Context);
  const { fetching } = useContext(EmotionContext);

  //   if done fetching add another second of dealy
  useEffect(() => {
    if (!fetching) {
      setTimeout(() => {
        setDoneFetching(true);
      }, 1500);
    }
  }, [fetching]);

  if (!doneFetching) return <SplashScreen navigation={navigation} />;

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

            navigation.navigate("EmotionType");
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
              Mood
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
            navigation.navigate("EmotionMatching");
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
              Mood Match
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </MainContainer>
  );
};

export default EmotionsCategory;

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
