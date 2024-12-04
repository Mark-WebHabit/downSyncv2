import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import { shapesObj } from "../assets/shapes_sample_flatfiledb_local";
import { Context } from "../DataContext";
import { feedbackSound } from "../customHooks/PlaySound";
import { updateMatchingShapes } from "../utilities/Database";

const MatchShapesLevel = ({ navigation, route }) => {
  const { item } = route.params;
  const [ndx, setNdx] = useState(Math.floor(Math.random() * 3));
  const [items, setItems] = useState([item]);
  const [correct, setCorrect] = useState(false);
  const { speak } = useContext(Context);

  useEffect(() => {
    let indexA = Math.floor(Math.random() * 3);

    while (indexA == ndx) {
      indexA = Math.floor(Math.random() * 3);
    }

    let indexB = Math.floor(Math.random() * 3);

    while (indexB == ndx || indexB == indexA) {
      indexB = Math.floor(Math.random() * 3);
    }

    const arr = [];
    let itemA = shapesObj[Math.floor(Math.random() * shapesObj.length)];

    while (itemA.shape == item.shape || itemA.name == item.name) {
      itemA = shapesObj[Math.floor(Math.random() * shapesObj.length)];
    }

    let itemB = shapesObj[Math.floor(Math.random() * shapesObj.length)];

    while (
      itemB.shape == item.shape ||
      itemB.name == item.name ||
      itemA.name == itemB.name
    ) {
      itemB = shapesObj[Math.floor(Math.random() * shapesObj.length)];
    }

    arr[ndx] = item;
    arr[indexA] = itemA;
    arr[indexB] = itemB;

    setItems(arr);
  }, []);

  useEffect(() => {
    if (correct) {
      (async function () {
        await updateMatchingShapes(item.uid);
        navigation.goBack();
      })();
    }
  }, [correct]);
  if (items.length <= 1) {
    return null;
  }

  return (
    <MainContainer navigation={navigation} showSetting={false}>
      <View style={styles.imagesContainer}>
        {items.length >= 3 &&
          items.map((el, i) => (
            <TouchableOpacity
              style={styles.imageTouch}
              onPress={() => {
                speak(el.name);

                if (el.shape == item.shape) {
                  setCorrect(true);
                  feedbackSound(true);
                }
              }}
            >
              <Image
                source={el.image}
                style={styles.image}
                key={i}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.textContainer}>
        <ImageBackground
          style={styles.textImageBg}
          source={require("../assets/images/buttonwhite.png")}
        >
          <Text style={styles.text}>
            Select the image that represent {item.shape} shape
          </Text>
        </ImageBackground>
      </View>
    </MainContainer>
  );
};

export default MatchShapesLevel;

const styles = StyleSheet.create({
  imagesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imageTouch: {
    width: "20%",
    aspectRatio: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    height: "30%",
    width: "55%",
    margin: "auto",
  },
  textImageBg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    width: "85%",
    textAlign: "center",
    marginHorizontal: "auto",
    fontSize: 25,

    fontWeight: "700",
  },
});
