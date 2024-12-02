import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Dimensions, Text } from "react-native";
import { Image } from "expo-image";

import MainContainer from "../components/MainContainer.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SplashScreen = () => {
  const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: SCREEN_WIDTH,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -SCREEN_WIDTH,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [translateX]);

  return (
    <MainContainer
      addStyle={styles.container}
      showSetting={false}
      showBack={false}
    >
      <View style={styles.wrapper}>
        <Animated.View
          style={[styles.imageContainer, { transform: [{ translateX }] }]}
        >
          <Image
            source={require("../assets/images/chick.gif")}
            style={styles.gif}
            contentFit="fill"
          />
          <Image
            source={require("../assets/images/chick.gif")}
            style={styles.gif}
            contentFit="fill"
          />
          <Image
            source={require("../assets/images/chick.gif")}
            style={styles.gif}
            contentFit="fill"
          />
          <Image
            source={require("../assets/images/chick.gif")}
            style={styles.gif}
            contentFit="fill"
          />
          <Image
            source={require("../assets/images/chick.gif")}
            style={styles.gif}
            contentFit="fill"
          />
        </Animated.View>
      </View>

      <View style={styles.lowerView}>
        <Text style={styles.lowerText}>
          Gathering <Text style={styles.resources}>Resources</Text>...
        </Text>
      </View>
    </MainContainer>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  imageContainer: {
    flexDirection: "row",
    width: SCREEN_WIDTH,
  },
  gif: {
    width: 100,
    height: 100,
    transform: [{ scaleX: -1 }],
  },
  lowerView: {
    paddingVertical: 30,
  },
  lowerText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#FF6347",
    fontFamily: "Comic Sans MS",
  },
  resources: {
    color: "#FFD700",
    textShadowColor: "#FF4500",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
