import { Image, StyleSheet, View, Animated, Alert } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Container from "../components/Container.js";
import Loading from "../components/Loading.js";
import { Context } from "../DataContext.js";
import { getUserGameInstanceMatchingEasy } from "../utilities/GetUserGameInstance.js";
import { getSavedUser, removePreference } from "../utilities/preferences.js";

const Letter = ({ path, delay }) => {
  const translateY = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      delay,
      useNativeDriver: true,
    }).start();
  }, [translateY, delay]);

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <Image source={path} />
    </Animated.View>
  );
};

const GatherResources = ({ navigation }) => {
  const [fetching, setFetching] = useState(true);
  const [delay, setDelay] = useState(true);

  // removePreference("uid");
  // removePreference("user");

  useEffect(() => {
    // gather resources here
    // if (!fetching) {
    setTimeout(() => {
      setDelay(false);
    }, 2000);
    // }
  }, [fetching]);

  useEffect(() => {
    async function fetch() {
      const { uid } = await getSavedUser();

      if (!delay && !uid) {
        navigation.navigate("Start");
      } else if (!delay && uid) {
        navigation.navigate("Home");
      }
    }

    fetch();
  }, [delay]);

  return (
    <Container addStyle={styles.container}>
      <View style={styles.top}>
        <Letter path={require("../assets/images/D.png")} delay={0} />
        <Letter path={require("../assets/images/Obig.png")} delay={100} />
        <Letter path={require("../assets/images/W.png")} delay={200} />
        <Letter path={require("../assets/images/N.png")} delay={300} />
        <View style={{ marginHorizontal: "3%" }} />
        <Letter path={require("../assets/images/S.png")} delay={400} />
        <Letter path={require("../assets/images/Y.png")} delay={500} />
        <Letter path={require("../assets/images/N.png")} delay={600} />
        <Letter path={require("../assets/images/C.png")} delay={700} />
      </View>

      <Loading />
    </Container>
  );
};

export default GatherResources;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
