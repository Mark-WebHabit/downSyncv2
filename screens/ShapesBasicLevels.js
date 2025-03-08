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
import { Context } from "../DataContext";
import { updateBasicShapes, updateMatching } from "../utilities/Database";
import { ArtContext } from "../GroupContext/ArtsContext";
import { shapes } from "../assets/shapes_flatfiledb_local";
const ShapesBasicLevels = ({ navigation, route }) => {
  const { item } = route.params;
  const { speak, sound } = useContext(Context);
  const [nextItem, setNextItem] = useState(null);

  const { basicShapes, setBasicShapes } = useContext(ArtContext);

  useEffect(() => {
    speak(`${item.shape}; ${item.description}`);

    (async function () {
      await updateMatching(
        item.uid,
        "basicShapes",
        setBasicShapes,
        basicShapes
      );
    })();
  }, []);

  useEffect(() => {
    if (item?.name < basicShapes?.length - 1) {
      const newItem = {
        ...basicShapes[item.name + 1],
        ...shapes[item.name + 1],
      };
      setNextItem(newItem);
    }
  }, [item]);

  return (
    <MainContainer
      showSetting={false}
      navigation={navigation}
      addStyle={styles.container}
    >
      {nextItem && (
        <TouchableOpacity
          style={styles.nextItemContainer}
          onPress={() => {
            sound();
            navigation.replace("ShapesBasicLevels", {
              item: nextItem,
            });
          }}
        >
          <Image source={nextItem.image} style={styles.nextItem} />
        </TouchableOpacity>
      )}
      <View style={styles.absolute} />
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
    position: "relative",
  },
  absolute: {
    position: "absolute",
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    opacity: 0.3,
  },
  imageContainer: {
    width: "80%",
    height: "50%",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "75%",
    aspectRatio: 1,
  },
  textContainer: {
    width: "70%",
    height: "35%",
    margin: "auto",
  },
  textContainerBg: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  shape: {
    fontSize: 25,
    fontWeight: "bold",
  },

  text: {
    textAlign: "center",
    width: "90%",
    fontSize: 20,
  },
  nextItemContainer: {
    borderWidth: 2,
    position: "absolute",
    top: 20,
    right: 50,
    height: 50,
    width: 50,
    backgroundColor: "white",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  nextItem: {
    height: 40,
    width: 40,
  },
});
