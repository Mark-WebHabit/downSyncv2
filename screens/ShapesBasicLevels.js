import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import MainContainer from "../components/MainContainer";
import { Context } from "../DataContext";
import { updateBasicShapes } from "../utilities/Database";
const ShapesBasicLevels = ({ navigation, route }) => {
  const { item } = route.params;
  const { speak } = useContext(Context);

  useEffect(() => {
    speak(`${item.shape}; ${item.description}`);

    (async function () {
      await updateBasicShapes(item.uid);
    })();
  }, []);

  return (
    <MainContainer
      showSetting={false}
      navigation={navigation}
      addStyle={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="stretch" />
      </View>

      <View style={styles.textContainer}>
        <ImageBackground
          source={require("../assets/images/buttonwhite.png")}
          style={styles.textContainerBg}
        >
          <Text style={styles.shape}>{item.shape}</Text>
          <Text style={styles.text}>{item.description}</Text>
        </ImageBackground>
      </View>
    </MainContainer>
  );
};

export default ShapesBasicLevels;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "80%",
    height: "50%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    aspectRatio: 1,
  },
  textContainer: {
    width: "60%",
    height: "33%",
    margin: "auto",
  },
  textContainerBg: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  shape: {
    fontSize: 30,
    fontWeight: "bold",
  },

  text: {
    textAlign: "center",
    width: "80%",
    fontSize: 22,
  },
});
