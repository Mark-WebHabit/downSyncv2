import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";

import MainContainer from "../components/MainContainer";
import { objects } from "../assets/objects_flatfiledb";
import { Image } from "expo-image";
import { usePlayMp3 } from "../customHooks/PlaySound";
import { Context } from "../DataContext";

const width = Dimensions.get("window").width - 130;
const height =
  Dimensions.get("window").height -
  (Platform.OS === "android" ? StatusBar.currentHeight : 0);

const Count = ({ navigation }) => {
  const [number, setNumber] = useState(Math.floor(Math.random() * 50)); // Generate number only once
  const [answer, setAnswer] = useState("");
  const [doneTyping, setDoneTyping] = useState(false);
  const [randomObjects, setRandomObjects] = useState([]);
  const [guessed, setGuessed] = useState(false); // State for guessed correctly
  const { speak } = useContext(Context);
  const input = useRef(null);
  const correct = usePlayMp3(require("../assets/sounds/clapping.mp3"));

  useEffect(() => {
    const generatedObjects = Array.from(
      { length: number },
      () => objects[Math.floor(Math.random() * objects.length)]
    );
    setRandomObjects(generatedObjects);
    speak("Can you count how many objects are in there?");
  }, [number]);

  useEffect(() => {
    if (doneTyping && answer) {
      if (parseInt(answer) === number) {
        correct();
        setGuessed(true);
      } else {
        speak("Nice try! do want to try again?");
      }
    }
  }, [answer, doneTyping, number]);

  const resetGame = () => {
    setNumber(Math.floor(Math.random() * 50));
    setAnswer("");
    setGuessed(false);
  };

  return (
    <MainContainer
      addStyle={styles.container}
      showSetting={false}
      navigation={navigation}
    >
      <TouchableOpacity
        style={styles.chat}
        onPress={() => {
          input.current?.focus();
        }}
      >
        <Image
          source={require("../assets/images/chat.png")}
          style={styles.chatImg}
          contentFit="contain"
        />
        <TextInput
          value={answer}
          style={styles.input}
          ref={input}
          onFocus={() => setAnswer("")}
          onChangeText={(text) => {
            setDoneTyping(false);
            setAnswer(text);
          }}
          onBlur={() => {
            setDoneTyping(true);
          }}
        />
      </TouchableOpacity>
      <View style={styles.bg}>
        <View style={styles.objectContainer}>
          {randomObjects.map((object, i) => (
            <Image
              key={i}
              source={object.image}
              contentFit="contain"
              style={[
                styles.image,
                {
                  width: width / number, // Divide width by number to fit images
                  height: height / number, // Divide height by number to fit images
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Modal for correct guess */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={guessed}
        onRequestClose={() => {
          setGuessed(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Yay! You guessed it right!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => resetGame()}
            >
              <Text style={styles.modalButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </MainContainer>
  );
};

export default Count;

const styles = StyleSheet.create({
  container: {},
  bg: {
    backgroundColor: "rgba(255,255,255,0.2)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 80,
    paddingRight: 50,
    position: "relative",
  },
  objectContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    columnGap: 10,
    maxHeight: height,
    // backgroundColor: "rgba(255,255,255,0.3)",
  },
  image: {
    minWidth: 47,
    minHeight: 47,
    maxHeight: 120,
    maxWidth: 120,
  },
  chat: {
    padding: 10,
    backgroundColor: "#EF5350",
    borderRadius: 5,
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 3,
  },

  chatImg: {
    height: 35,
    width: 35,
  },
  input: {
    position: "absolute",
    opacity: 0,
    zIndex: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#EF5350",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 18,
  },
});
