import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import MainContainer from "../components/MainContainer";
import { generateTwoRandomNumbers } from "../utilities/Arrays";
import { animalsDescribe } from "../assets/animal_flatfiledb";
import useUserPreferences from "../customHooks/useUserPreference";
import { feedbackSound } from "../customHooks/PlaySound";
import { updateMatching } from "../utilities/Database";
import { Context } from "../DataContext";
import { AnimalsContext } from "../GroupContext/AnimalsContext";

const backgrounds = [
  require("../assets/images/buttonbluebox.png"),
  require("../assets/images/buttonmintbox.png"),
  require("../assets/images/buttongreenbox.png"),
];

const MatchingDescGameLevel = ({ navigation, route }) => {
  const { buttonSize, bodyText } = useUserPreferences();
  const { item } = route.params;
  const { speak } = useContext(Context);

  const [animalsArray, setAnimalsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const { matchingHard, setMatchingHard } = useContext(AnimalsContext);

  useEffect(() => {
    const loadData = async () => {
      if (animalsArray.length >= 3) {
        return;
      }

      const indeces = generateTwoRandomNumbers(item.name);

      const newAnimals = indeces.map((num) => {
        const obj = {
          ...animalsDescribe[num],
          index: num,
        };
        return obj;
      });

      // Add a delay before setting the animalsArray
      setAnimalsArray([...newAnimals, animalsDescribe[item.name]]);
    };

    loadData();
    setLoading(false);
  }, []);

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
      <View style={styles.imagesContainer}>
        {animalsArray.map((animal, index) => {
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
                const currentTarget = animal["index"];
                if (currentTarget != item.name) {
                  feedbackSound(false);
                } else {
                  const itemUid = item.uid;
                  await updateMatching(
                    itemUid,
                    "hard",
                    setMatchingHard,
                    matchingHard
                  );
                  navigation.goBack();
                  feedbackSound(true);
                }
              }}
            >
              <ImageBackground source={backgrounds[index]} style={styles.btnBg}>
                <Image source={animal.image} style={styles.img} />
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
            onPress={() => speak(animalsDescribe[item.name].description)}
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
                fontSize: bodyText * 1.2,
                wordWrap: "wrap",
                fontWeight: "600",
              },
            ]}
          >
            {animalsDescribe[item.name].description}
          </Text>
        </ImageBackground>
      </View>
    </MainContainer>
  );
};

export default MatchingDescGameLevel;

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
    width: "85%",
    height: "85%",
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
  question: {},

  speaker: {
    resizeMode: "stretch",
    width: 40,
    height: 40,
  },
});
