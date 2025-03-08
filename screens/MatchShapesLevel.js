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
import { updateMatching } from "../utilities/Database";
import { ArtContext } from "../GroupContext/ArtsContext";
import Lottie from "../components/Lottie";

const MatchShapesLevel = ({ navigation, route }) => {
  const { item } = route.params;
  const [ndx, setNdx] = useState(Math.floor(Math.random() * 3));
  const [items, setItems] = useState([item]);
  const [correct, setCorrect] = useState(false);
  const { speak } = useContext(Context);
  const [nextItem, setNextItem] = useState(null);

  const { shapesMatching, setShapesMatching } = useContext(ArtContext);

  useEffect(() => {
    if (item?.index < shapesMatching?.length - 1) {
      const newItem = {
        ...shapesMatching[item.index + 1],
        ...shapesObj[item.index + 1],
        index: item.index + 1,
      };
      setNextItem(newItem);
    }
  }, [item, correct]);

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
    console.log(nextItem);

    if (correct && nextItem) {
      setTimeout(() => {
        (async function () {
          await updateMatching(
            item.uid,
            "shapesMatching",
            setShapesMatching,
            shapesMatching
          );
          navigation.replace("MatchShapesLevel", {
            item: nextItem,
          });
        })();
      }, 1500);
    } else if (correct && !nextItem) {
      (async function () {
        await updateMatching(
          item.uid,
          "shapesMatching",
          setShapesMatching,
          shapesMatching
        );
        navigation.goBack();
      })();
    }
  }, [correct]);

  useEffect(() => {
    speak(` Select the image that represent ${item.shape} shape`);
  }, []);

  if (items.length <= 1) {
    return null;
  }

  return (
    <MainContainer navigation={navigation} showSetting={false}>
      {correct && <Lottie />}
      <View style={styles.imagesContainer}>
        {items.length >= 3 &&
          items.map((el, i) => (
            <TouchableOpacity
              style={styles.imageTouch}
              onPress={() => {
                speak(el.shape);

                if (el.shape == item.shape) {
                  setCorrect(true);
                  feedbackSound(true);
                }
              }}
              key={i}
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
            Select the image that shows {item.shape} shape
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
    borderWidth: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    backgroundColor: "#E6EDEC",
  },
  image: {
    aspectRatio: 1,
    height: "80%",
  },
  textContainer: {
    height: "35%",
    width: "70%",
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
    fontSize: 30,
    fontWeight: "700",
  },
});
