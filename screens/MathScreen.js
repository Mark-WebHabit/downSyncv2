import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import MainContainer from "../components/MainContainer";
import useUserPreferences from "../customHooks/useUserPreference";

import { feedbackSound } from "../customHooks/PlaySound";

const MathScreen = ({ navigation, route }) => {
  const { op } = route.params;
  const { buttonFontColor } = useUserPreferences();
  const [nums, setNums] = useState(null);
  const [operation, setOperation] = useState("");
  const [answer, setAnswer] = useState(0);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    generateQuestion();
  }, [op]);

  const generateQuestion = () => {
    let num1 = 0;
    let num2 = 0;

    if (op == "minus" || op == "plus") {
      do {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
      } while (
        (op == "plus" && num1 + num2 > 30) ||
        (op == "minus" && (num1 - num2 > 30 || num1 < num2))
      );
    } else {
      num1 = Math.floor(Math.random() * 9) + 1;
      num2 = Math.floor(Math.random() * 9) + 1;
    }

    let correctAnswer = 0;
    switch (op) {
      case "plus":
        setOperation("+");
        correctAnswer = num1 + num2;
        break;
      case "minus":
        setOperation("-");
        correctAnswer = num1 - num2;
        break;
      case "times":
        setOperation("×");
        correctAnswer = num1 * num2;
        break;
      default:
        setOperation("÷");
        correctAnswer = Math.floor(num1 / num2);
        break;
    }

    setAnswer(correctAnswer);

    const choicesArray = [correctAnswer];
    while (choicesArray.length < 3) {
      const randomChoice = correctAnswer + Math.floor(Math.random() * 10) - 5;
      if (
        randomChoice !== correctAnswer &&
        randomChoice > 0 &&
        !choicesArray.includes(randomChoice)
      ) {
        choicesArray.push(randomChoice);
      }
    }

    setChoices(shuffleArray(choicesArray));

    setNums({
      num1,
      num2,
    });
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleChoiceClick = (choice) => {
    if (choice === answer) {
      feedbackSound(true);
      setTimeout(() => {
        generateQuestion();
      }, 500);
    } else {
      feedbackSound();
    }
  };

  return (
    <MainContainer
      showSetting={false}
      navigation={navigation}
      addStyle={styles.container}
    >
      <View style={styles.questionConainer}>
        <ImageBackground
          source={require("../assets/images/math/board.png")}
          style={styles.bg}
        >
          {nums && (
            <Text
              style={[
                styles.text,
                {
                  color: buttonFontColor,
                },
              ]}
            >
              {nums.num1} {" " + operation + " "} {nums.num2}
            </Text>
          )}
        </ImageBackground>
      </View>

      <View style={styles.choicesCotainer}>
        {choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleChoiceClick(choice)}
          >
            <ImageBackground
              style={styles.buttonBg}
              source={require("../assets/images/math/box.png")}
            >
              <Text
                style={[
                  styles.answer,
                  {
                    color: buttonFontColor,
                  },
                ]}
              >
                {choice}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </MainContainer>
  );
};

export default MathScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  questionConainer: {
    width: "55%",
    height: 120,
  },

  bg: {
    width: "100%",
    aspectRatio: 4459 / 1672,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },

  choicesCotainer: {
    height: "40%",
    width: "55%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  button: {
    width: "33%",
    aspectRatio: 1,
  },
  buttonBg: {
    height: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  answer: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
