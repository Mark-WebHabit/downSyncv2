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
import { ArtContext } from "../GroupContext/ArtsContext";
import SplashScreen from "./SplashScreen";

const ArtsCategory = ({ navigation }) => {
  const [doneFetching, setDoneFetching] = useState(false);
  const { fontSize, buttonFontColor, buttonSize } = useUserPreferences();
  const { sound } = useContext(Context);
  const { fetching } = useContext(ArtContext);

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

            navigation.navigate("Colors");
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
              Basic Colors
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

            navigation.navigate("MixColors");
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
              Mix Colors
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
            navigation.navigate("shapes");
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
              Shapes
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </MainContainer>
  );
};

export default ArtsCategory;

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
