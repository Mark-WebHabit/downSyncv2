import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState, useTransition } from "react";

import MainContainer from "../components/MainContainer";
import { generateTwoRandomNumbers } from "../utilities/Arrays";
import { emotionSample } from "../assets/emotions_sample_flatfiledb_local";
import useUserPreferences from "../customHooks/useUserPreference";
import { feedbackSound } from "../customHooks/PlaySound";
import { updateMatching } from "../utilities/Database";
import { Context } from "../DataContext";
import { EmotionContext } from "../GroupContext/EmotionContext";
import Lottie from "../components/Lottie";

const backgrounds = [
  require("../assets/images/buttonbluebox.png"),
  require("../assets/images/buttonmintbox.png"),
  require("../assets/images/buttongreenbox.png"),
];

const EmotionMatchingLevel = ({ navigation, route }) => {
  const { buttonSize, bodyText } = useUserPreferences();

  const { item } = route.params;

  const { speak, stop } = useContext(Context);

  const [emotionsArray, setEmotionsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correct, setCorrect] = useState(false);

  const { emotionsMatching, setEmotionsMatching } = useContext(EmotionContext);

  useEffect(() => {
    if (correct) {
      setTimeout(() => {
        if (item.index < emotionSample.length - 1) {
          const nextItem = {
            ...emotionSample[item.index + 1],
            name: emotionsMatching[item.index + 1]?.name,
            uid: emotionsMatching[item.index + 1]?.uid,
            index: item.index + 1,
          };
          stop();
          navigation.replace("EmotionMatchingLevel", {
            item: nextItem,
          });
        } else {
          navigation.goBack();
        }
      }, 1500);
    }
  }, [correct]);

  useEffect(() => {
    const loadData = async () => {
      if (emotionsArray.length >= 3) {
        return;
      }

      let indeces = generateTwoRandomNumbers(item.name, 10);

      let duplicateEmote = indeces.filter(
        (indx) => emotionSample[indx].emotion == item.emotion
      );

      while (duplicateEmote.length >= 2) {
        indeces = generateTwoRandomNumbers(item.name, 14);
        duplicateEmote = indeces.filter(
          (indx) => emotionSample[indx].emotion == item.emotion
        );
      }

      const newEMote = indeces.map((num) => {
        const obj = {
          ...emotionSample[num],
          index: num,
        };
        return obj;
      });

      // Add a delay before setting the animalsArray
      setEmotionsArray([...newEMote]);
    };

    loadData();
    setLoading(false);
  }, [item]);

  const hanldeCLick = async (el) => {
    if (item.name == el.index && el.emotion == item.emotion) {
      const id = item.uid;
      await updateMatching(
        id,
        "emotionsMatching",
        setEmotionsMatching,
        emotionsMatching
      );
      feedbackSound(true);
      setCorrect(true);
    } else {
      feedbackSound();
    }
  };

  if (loading) {
    return (
      <MainContainer navigation={navigation} showSetting={false}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </MainContainer>
    );
  }

  return (
    <MainContainer navigation={navigation} showSetting={false}>
      {correct && <Lottie />}
      <View style={styles.imagesContainer}>
        {emotionsArray.map((emoteItem, index) => {
          if (index > 2) {
            return null;
          }
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.imgBtn,
                {
                  transform: [{ scale: buttonSize }],
                },
              ]}
              onPress={async () => {
                hanldeCLick(emoteItem);
              }}
            >
              <ImageBackground source={backgrounds[index]} style={styles.btnBg}>
                <Image source={emoteItem?.image} style={styles.img} />
              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.questionContainer}>
        <ImageBackground
          source={require("../assets/images/buttonwhite.png")}
          style={styles.lowerBackground}
        >
          <TouchableOpacity
            onPress={() => speak(`Which image conveys ${item.emotion}?`)}
          >
            <Image
              source={require("../assets/images/speaker-black.png")}
              style={styles.speaker}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.question,
              {
                fontSize: bodyText * 1.5,
                fontWeight: "600",
              },
            ]}
          >
            Which image conveys {" " + item.emotion}?
          </Text>
        </ImageBackground>
      </View>
    </MainContainer>
  );
};

export default EmotionMatchingLevel;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
  },
  imagesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  imgBtn: {
    width: 150,
    aspectRatio: 1,
  },
  btnBg: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    resizeMode: "stretch",
    height: "75%",
    aspectRatio: 1,
    zIndex: 2,
  },

  questionContainer: {
    height: 100,
    padding: 10,
  },
  lowerBackground: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  question: {
    width: "85%",
    textAlign: "center",
  },

  speaker: {
    resizeMode: "stretch",
    width: 40,
    height: 40,
  },
});
