import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";

// component
import MainContainer from "../components/MainContainer";
import { Image } from "expo-image";

import { usePlaySound } from "../customHooks/PlaySound";
import { Context } from "../DataContext";

const Home = ({ navigation }) => {
  const { sound } = useContext(Context);
  return (
    <MainContainer
      showBack={false}
      addStyle={styles.container}
      navigation={navigation}
    >
      {/* <View style={} */}
      <TouchableOpacity
        style={styles.imgCOntainer}
        onPress={() => {
          sound();
          navigation.navigate("GameList");
        }}
      >
        <Image
          source={require("../assets/images/play.png")}
          style={styles.play}
          contentFit="fill"
        />
      </TouchableOpacity>
    </MainContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  imgCOntainer: {
    height: 100,
    width: 100,
  },
  play: {
    height: "100%",
    width: "100%",
  },
});
