import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import { Image } from "react-native";
import Svg, { Line } from "react-native-svg";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { matching } from "../assets/matching_flatfiledb_local";
import { Context } from "../DataContext";
import IncorrectMatchModal from "../components/IncorrctMacth";
import CorrectMatchModal from "../components/CorrctMactch";
import { feedbackSound } from "../customHooks/PlaySound";
import { updateMatching } from "../utilities/Database";
import HelpModal from "../components/HelpModalForObjects";
import { GamesContext } from "../GroupContext/GameContext";
import Lottie from "../components/Lottie";

const getRandomOrder = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const MatchingLevel = ({ navigation, route }) => {
  const { item } = route.params;
  const { matching: matchingData } = useContext(GamesContext);

  const [level, setLevel] = useState(matching[item["name"]]);

  const { matching: matchingObject, setMatching } = useContext(GamesContext);

  // const level = matching[0]; // Using the first index for demonstration
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [connecteds, setConnecteds] = useState([]);
  const [incorrectMatchVisible, setIncorrectMatchVisible] = useState(false);
  const [correctMatchVisible, setCorrectMatchVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const { speak } = useContext(Context);
  const validTargets = useRef({});

  useEffect(() => {
    const randomizedImages = getRandomOrder(level);
    const randomizedTexts = getRandomOrder(level);
    setImages(randomizedImages);
    setTexts(randomizedTexts);
  }, []);

  const registerTarget = (key, x, y, width, height) => {
    validTargets.current[key] = { x, y, width, height };
  };

  const isWithinBounds = (x, y, bounds) => {
    return (
      x >= bounds.x &&
      x <= bounds.x + bounds.width &&
      y >= bounds.y &&
      y <= bounds.y + bounds.height
    );
  };

  const handleGesture = async (event, index) => {
    if (connecteds.includes(index)) return;

    const { nativeEvent } = event;
    if (nativeEvent.state === State.BEGAN) {
      setCurrentLine({
        startX: nativeEvent.absoluteX,
        startY: nativeEvent.absoluteY,
        endX: nativeEvent.absoluteX,
        endY: nativeEvent.absoluteY,
        startingKey:
          `img-${index}` in validTargets.current
            ? `img-${index}`
            : `text-${index}`,
      });
    } else if (nativeEvent.state === State.ACTIVE && currentLine) {
      setCurrentLine({
        ...currentLine,
        endX: nativeEvent.absoluteX,
        endY: nativeEvent.absoluteY,
      });
    } else if (nativeEvent.state === State.END && currentLine) {
      const endKey = Object.keys(validTargets.current).find((key) =>
        isWithinBounds(
          nativeEvent.absoluteX,
          nativeEvent.absoluteY,
          validTargets.current[key]
        )
      );

      if (endKey) {
        const isStartingFromImage = currentLine.startingKey.startsWith("img-");
        const targetIndex = isStartingFromImage
          ? endKey.replace("text-", "")
          : endKey.replace("img-", "");

        const targetItem = isStartingFromImage
          ? texts[targetIndex]
          : images[targetIndex];
        const currentItem = isStartingFromImage ? images[index] : texts[index];

        if (targetItem === currentItem) {
          setLines([...lines, { ...currentLine, color: "green" }]);

          if (connecteds.length === level.length - 1) {
            feedbackSound(true);
            setCorrectMatchVisible(true);
            await updateMatching(
              item.uid,
              "objectMatching",
              setMatching,
              matchingObject
            );
          }

          setConnecteds((old) => [...old, index]);
        } else {
          feedbackSound(false);
          setIncorrectMatchVisible(true);
          setConnecteds((old) => [...old, index]);
          setLines([...lines, { ...currentLine, color: "red" }]);
        }
      } else {
        feedbackSound(false);
        setIncorrectMatchVisible(true);
      }

      setCurrentLine(null);
    }
  };

  const undoLastLine = () => {
    setLines((prevLines) => prevLines.slice(0, -1));
    const undoconnect = connecteds;
    undoconnect.pop();

    setConnecteds(undoconnect);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {correctMatchVisible && <Lottie />}
      <Svg style={StyleSheet.absoluteFill}>
        {lines.map((line, index) => (
          <Line
            key={index}
            x1={line.startX}
            y1={line.startY}
            x2={line.endX}
            y2={line.endY}
            stroke={line.color}
            strokeWidth="10"
          />
        ))}
        {currentLine && (
          <Line
            x1={currentLine.startX}
            y1={currentLine.startY}
            x2={currentLine.endX}
            y2={currentLine.endY}
            stroke="red"
            strokeWidth="10"
          />
        )}
      </Svg>

      <View style={styles.columnContainer}>
        <View style={styles.column}>
          {images.map((item, index) => (
            <View
              key={index}
              style={[styles.itemContainer]}
              onLayout={(e) =>
                registerTarget(
                  `img-${index}`,
                  e.nativeEvent.layout.x,
                  e.nativeEvent.layout.y,
                  e.nativeEvent.layout.width,
                  e.nativeEvent.layout.height
                )
              }
            >
              <Pressable onPress={() => speak(item.name)}>
                <Image source={item.image} style={styles.img} />
              </Pressable>
              <PanGestureHandler
                onGestureEvent={(e) => handleGesture(e, index)}
                // onHandlerStateChange={(e) => handleGesture(e, index)}
              >
                <View
                  disabled={true}
                  style={[
                    styles.connectionPoint,
                    styles.textConnectionPoint,
                    {
                      backgroundColor: "green",
                    },
                  ]}
                ></View>
              </PanGestureHandler>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.column,
            {
              justifyContent: "space-around",
              height: "100%",
              padding: 0,
            },
          ]}
        >
          {texts.map((item, index) => (
            <View
              key={index}
              style={[
                styles.itemContainer,
                {
                  flex: 1,
                },
              ]}
              onLayout={(e) =>
                registerTarget(
                  `text-${index}`,
                  e.nativeEvent.layout.x,
                  e.nativeEvent.layout.y,
                  e.nativeEvent.layout.width,
                  e.nativeEvent.layout.height
                )
              }
            >
              <PanGestureHandler
                onGestureEvent={(e) => handleGesture(e, index)}
                onHandlerStateChange={(e) => handleGesture(e, index)}
              >
                <TouchableOpacity
                  style={[styles.connectionPoint, styles.textConnectionPoint]}
                ></TouchableOpacity>
              </PanGestureHandler>
              <Pressable onPress={() => speak(item.description)}>
                <Text style={styles.text}>{item.description}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.topLeftButtons}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={undoLastLine} style={styles.undoButton}>
          <Icon name="undo" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setHelpVisible(true)}
          style={[
            styles.undoButton,
            {
              backgroundColor: "green",
            },
          ]}
        >
          <Icon name="question-circle" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <IncorrectMatchModal
        visible={incorrectMatchVisible}
        onClose={() => setIncorrectMatchVisible(false)}
      />
      <CorrectMatchModal
        visible={correctMatchVisible}
        onClose={() => {
          setCorrectMatchVisible(false);

          if (item?.name < matchingData.length - 1) {
            const newItem = { ...matchingData[item.name + 1] };

            navigation.replace("Matching", {
              item: newItem,
            });
          } else {
            navigation.goBack();
          }
        }}
      />
      <HelpModal visible={helpVisible} onClose={() => setHelpVisible(false)} />
    </View>
  );
};

export default MatchingLevel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    paddingRight: 20,
    paddingVertical: 0,
    borderColor: "black",
    justifyContent: "center",
    paddingRight: 50,
  },
  columnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "5%",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    position: "relative",
  },
  img: {
    resizeMode: "stretch",
    height: Dimensions.get("window").height * 0.25,
    aspectRatio: 1,
  },
  connectionPoint: {
    width: 30,
    height: 30,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
  },
  textConnectionPoint: {
    marginRight: 10,
  },
  topLeftButtons: {
    position: "absolute",
    top: 20,
    left: 30,
  },
  backButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  undoButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 25,
    marginVertical: 5,
  },
  text: {
    width: "90%",
    fontSize: 20,
    fontWeight: "bold",
  },
});
