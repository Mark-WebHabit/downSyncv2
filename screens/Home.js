import { StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useContext } from "react";

// component
import MainContainer from "../components/MainContainer";
import { Image } from "expo-image";

import { Context } from "../DataContext";

const Home = ({ navigation }) => {
  const { sound } = useContext(Context);

  return (
    <MainContainer
      showBack={false}
      addStyle={styles.container}
      navigation={navigation}
    >
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
        <Text style={styles.clickHere}>Click Here!</Text>
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
  imgCOntainer: {
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },

  play: {
    height: 100,
    width: 100,
  },
  clickHere: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});
