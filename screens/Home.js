import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  View,
  Pressable,
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
      <Image
        source={require("../assets/images/kdsapp.png")}
        style={styles.app}
      />
      <View style={styles.imgContainer}>
        <Pressable
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
        </Pressable>
        <Pressable
          onPress={() => {
            sound();
            navigation.navigate("GameList");
          }}
        >
          <Image
            source={require("../assets/images/clickhere.png")}
            style={styles.clickHereImg}
          />
        </Pressable>
      </View>
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
    marginTop: 30,
  },
  playWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  play: {
    height: 120,
    width: 120,
  },

  app: {
    width: 300,
    aspectRatio: 435 / 112,
    position: "absolute",
    top: 30,
  },
  clickHereImg: {
    aspectRatio: 406 / 102,
    height: 50,
    marginTop: 20,
  },
});
