import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import MainContainer from "../components/MainContainer";
import { Image } from "expo-image";
import { updateMatching } from "../utilities/Database";
import { Context } from "../DataContext";
import { WordContext } from "../GroupContext/WordsContext";
import { alphabetWords } from "../assets/letters_flatfiledb_local";

const LetterExample = ({ navigation, route }) => {
  const { sound, speak } = useContext(Context);
  const [ndx, setNdx] = useState(0);
  const item = route.params;

  const { letters, setLetters } = useContext(WordContext);
  const [nextItem, setNextItem] = useState(null);

  useEffect(() => {
    if (item?.index < letters?.length - 1) {
      const newItem = {
        ...alphabetWords[item.index + 1],
        uid: letters[item.index + 1]?.uid,
        index: item.index + 1,
      };

      setNextItem(newItem);
    }
  }, [item]);

  const handleNext = () => {
    sound();
    if (ndx <= item.images.length - 1) {
      setNdx((o) => o + 1);
    }
  };
  const handlePrev = () => {
    sound();
    if (ndx > 0) {
      setNdx((o) => o - 1);
    }
  };

  useEffect(() => {
    if (ndx == item.images.length) {
      updateMatching(item.uid, "letters", setLetters, letters);
    }

    if (ndx == 0) {
      speak(`Letter ${item.letter}`);
    }

    if (item?.words[ndx - 1]) {
      speak(item.words[ndx - 1]);
    }
  }, [ndx]);

  return (
    <MainContainer navigation={navigation} showSetting={false}>
      <View style={styles.container}>
        {item?.index < letters?.length - 1 && nextItem && (
          <TouchableOpacity
            style={styles.nextItemContainer}
            onPress={() => {
              sound();
              navigation.replace("LetterSample", nextItem);
            }}
          >
            <Image source={nextItem.icon} style={styles.newItem} />
          </TouchableOpacity>
        )}
        <View style={styles.imageConatiner}>
          {ndx <= 0 ? (
            <Image
              source={item.icon}
              style={styles.image}
              contentFit="contain"
            />
          ) : (
            <Image
              source={item.images[ndx - 1]}
              style={styles.image}
              contentFit="contain"
            />
          )}
        </View>
        {ndx > 0 && (
          <View style={styles.textContainer}>
            <Text style={[styles.sample]}>{item.words[ndx - 1]}</Text>
          </View>
        )}

        {ndx > 0 && (
          <TouchableOpacity
            style={[
              styles.arrow,
              {
                left: "10%",
              },
            ]}
            onPress={handlePrev}
          >
            <Image
              source={require("../assets/images/left.png")}
              style={styles.arrowImg}
              contentFit="contain"
            />
          </TouchableOpacity>
        )}
        {ndx <= item.images.length - 1 && (
          <TouchableOpacity
            style={[
              styles.arrow,
              {
                right: "10%",
              },
            ]}
            onPress={handleNext}
          >
            <Image
              source={require("../assets/images/right.png")}
              style={styles.arrowImg}
              contentFit="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </MainContainer>
  );
};

export default LetterExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },

  imageConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "70%",
    aspectRatio: 1,
  },
  textContainer: {
    paddingVertical: 20,
  },
  sample: {
    fontSize: 50,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  arrow: {
    position: "absolute",
    top: "50%",
  },
  arrowImg: {
    height: 60,
    width: 60,
  },
  nextItemContainer: {
    width: 60,
    height: 60,
    position: "absolute",
    top: 20,
    right: 50,
  },
  newItem: {
    width: "100%",
    height: "100%",
  },
});
