import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";

// component
import MainContainer from "../components/MainContainer";
import { Image } from "expo-image";

import { Context } from "../DataContext";

const Home = ({ navigation }) => {
  const { sound } = useContext(Context);

  // Animation ref
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Blinking animation (fades in and out)
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.5, // Reduce opacity
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1, // Restore opacity
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <MainContainer
      showBack={false}
      addStyle={styles.container}
      navigation={navigation}
    >
      <TouchableOpacity
        style={styles.imgContainer}
        onPress={() => {
          sound();
          navigation.navigate("GameList");
        }}
      >
        <Animated.View style={[styles.playWrapper, { opacity: fadeAnim }]}>
          <Image
            source={require("../assets/images/play.png")}
            style={styles.play}
            contentFit="fill"
          />
        </Animated.View>

        <Text style={styles.clickHere}>✨ Click Here! ✨</Text>
      </TouchableOpacity>
    </MainContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  imgContainer: {
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  playWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  play: {
    height: 90,
    width: 90,
  },
  clickHere: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700", // Gold color for a glowing effect
    textShadowColor: "rgba(255, 215, 0, 0.8)", // Golden glow
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop: 10,
  },
});
