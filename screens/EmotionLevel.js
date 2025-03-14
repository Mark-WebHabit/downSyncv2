import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import MainContainer from "../components/MainContainer";
import { Image } from "expo-image";
import { updateMatching } from "../utilities/Database";
import { Context } from "../DataContext";
import { EmotionContext } from "../GroupContext/EmotionContext";
import { emotions } from "../assets/emotions_flatfiledb_local";

const EmotionLevel = ({ navigation, route }) => {
  const { sound, speak } = useContext(Context);
  const [ndx, setNdx] = useState(0);
  const { item } = route.params;
  const [nextItem, setNextItem] = useState(null);

  useEffect(() => {
    if (item) {
      const index = item.index;

      if (index < emotions.length - 1) {
        const newItem = {
          ...emotions[index + 1],
          uid: emotionTypes[index + 1]?.uid,
          index: index + 1,
        };
        setNextItem(newItem);
      } else {
        setNextItem(null);
      }
    }
  }, [item]);

  const { emotionTypes, setEmotionTypes } = useContext(EmotionContext);

  const handleNext = () => {
    sound();
    if (ndx <= item.examples.length - 1) {
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
    if (ndx == item.examples.length) {
      updateMatching(item.uid, "typeEmotions", setEmotionTypes, emotionTypes);
    }

    if (ndx == 0) {
      speak(item.emotion);
    }
    if (item?.examples[ndx - 1]) {
      speak(item.examples[ndx - 1]);
    }
  }, [ndx]);

  return (
    <MainContainer navigation={navigation} showSetting={false}>
      <View style={styles.container}>
        {nextItem && (
          <TouchableOpacity
            style={styles.nextContainer}
            onPress={() => {
              navigation.replace("EmotionLevel", {
                item: nextItem,
              });
            }}
          >
            <Image source={nextItem.image} style={styles.next} />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              NEXT
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.imageConatiner}>
          <Image
            source={item?.image}
            style={styles.image}
            contentFit="contain"
          />
        </View>
        <View style={styles.textContainer}>
          {ndx > 0 ? (
            <Text style={[styles.sample]}>{item.examples[ndx - 1]}</Text>
          ) : (
            <Text style={[styles.sample]}>{item.emotion}</Text>
          )}
        </View>

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
        {ndx <= item.examples?.length - 1 && (
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

export default EmotionLevel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },

  imageConatiner: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    overflow: "hidden",
    height: 200,
    marginTop: 20,
    aspectRatio: 1,
  },
  textContainer: {
    paddingVertical: 20,
  },
  sample: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
    width: "80%",
    marginHorizontal: "auto",
  },
  arrow: {
    position: "absolute",
    top: "50%",
  },
  arrowImg: {
    height: 60,
    width: 60,
  },
  nextContainer: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 20,
    right: 50,
  },
  next: {
    width: "80%",
    height: "80%",
    marginHorizontal: "auto",
  },
});
