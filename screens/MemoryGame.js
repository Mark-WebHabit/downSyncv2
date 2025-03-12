import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { randomizeOrder } from "../utilities/Arrays";
import { objects } from "../assets/objects_flatfiledb";
import { Image } from "expo-image";
import MainContainer from "../components/MainContainer";
import { usePlayMp3, feedbackSound } from "../customHooks/PlaySound";
import { Context } from "../DataContext";
import Lottie from "../components/Lottie";

const MemoryGame = ({ navigation, route }) => {
  const { size = 2 } = route.params;
  const widthAndHeight = 100 / size;
  const randomArray = randomizeOrder(objects).slice(0, (size * size) / 2);

  const duplicate = [...randomArray];
  const images = useRef(
    randomizeOrder(randomArray.concat(duplicate)).map((el) => ({
      ...el,
      ["matched"]: false,
    }))
  ).current;

  const [gameStart, setGameStart] = useState(false);
  const [firstSelected, setFirstSelected] = useState(null);
  const [secondSelected, setSecondSelected] = useState(null);
  const [annalyzing, setAnnalyzing] = useState(false);
  const [openIndex, setOpenIndex] = useState([]);
  const [gameDone, setGameDone] = useState(false);
  const [showDone, setShowDOne] = useState(false);

  const clap = usePlayMp3(require("../assets/sounds/clapping.mp3"));
  const { sound } = useContext(Context);

  const animatedValues = useRef(
    images.map(() => new Animated.Value(0))
  ).current;

  const close = (index) => {
    Animated.spring(animatedValues[index], {
      toValue: 180,
      useNativeDriver: true,
    }).start();
  };
  const open = (index) => {
    Animated.spring(animatedValues[index], {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const handleUpdate = (targetIndex) => {
    const desc = images[targetIndex].description;
    images.forEach((el) => {
      if (desc == el.description) {
        el.matched = true;
      }
    });
  };

  const handleClick = (targetIndex) => {
    if (!gameStart || gameDone) return;
    if (annalyzing) return;
    if (images[targetIndex].matched) return;

    sound();

    if (firstSelected == null && secondSelected == null) {
      setFirstSelected(targetIndex);
    } else if (
      firstSelected != null &&
      secondSelected == null &&
      targetIndex != firstSelected
    ) {
      setSecondSelected(targetIndex);
    }
    open(targetIndex);
    setOpenIndex((old) => [...old, targetIndex]);
  };

  useEffect(() => {
    setTimeout(() => {
      images.forEach((_, i) => {
        close(i);
      });
      setGameStart(true);
    }, 2000);
  }, [images]);

  useEffect(() => {
    if (firstSelected != null && secondSelected != null) {
      setAnnalyzing(true);
      if (
        images[firstSelected].description != images[secondSelected].description
      ) {
        const n1 = firstSelected;
        const n2 = secondSelected;
        setTimeout(() => {
          close(n1);
          close(n2);
        }, 500);
        setAnnalyzing(false);
        setFirstSelected(null);
        setSecondSelected(null);
      } else {
        feedbackSound(true);
        handleUpdate(firstSelected);
        setFirstSelected(null);
        setSecondSelected(null);
        setAnnalyzing(false);

        const isDone = images.every((el) => el.matched == true);

        if (isDone) {
          setGameDone(true);
        }
      }

      setOpenIndex([]);
    }
  }, [firstSelected, secondSelected]);

  useEffect(() => {
    if (openIndex.length > 2) {
      openIndex.forEach((idx) => {
        if (!images[idx].matched) {
          if (idx !== firstSelected || idx !== secondSelected) {
            close(idx);
          }
        }
      });
    }
  }, [firstSelected, secondSelected, openIndex]);

  useEffect(() => {
    if (gameDone) {
      clap();
      setShowDOne(true);
    }
  }, [gameDone]);

  const restartGame = () => {
    const newRandomArray = randomizeOrder(objects).slice(0, (size * size) / 2);
    const newDuplicate = [...newRandomArray];
    const newImages = randomizeOrder(newRandomArray.concat(newDuplicate)).map(
      (el) => ({
        ...el,
        matched: false,
      })
    );

    images.splice(0, images.length, ...newImages); // Reset images with new set
    animatedValues.forEach((value) => value.setValue(0)); // Reset animation states
    setFirstSelected(null);
    setSecondSelected(null);
    setAnnalyzing(false);
    setOpenIndex([]);
    setGameStart(false);
    setGameDone(false);
    setShowDOne(false);

    setTimeout(() => {
      images.forEach((_, i) => close(i));
      setGameStart(true);
    }, 2000);
  };

  return (
    <MainContainer
      addStyle={styles.container}
      navigation={navigation}
      showSetting={false}
    >
      {showDone && <Lottie />}
      <View
        style={[
          styles.board,
          {
            transform: [{ scale: size === 2 ? 0.8 : 1 }],
          },
        ]}
      >
        {images.map((image, index) => {
          const frontInterpolate = animatedValues[index].interpolate({
            inputRange: [0, 180],
            outputRange: ["180deg", "360deg"],
          });

          const backInterpolate = animatedValues[index].interpolate({
            inputRange: [0, 180],
            outputRange: ["0deg", "180deg"],
          });

          return (
            <TouchableOpacity
              style={[
                styles.imageContainer,
                { width: `${widthAndHeight}%`, height: `${widthAndHeight}%` },
              ]}
              key={index}
              onPress={() => handleClick(index)}
            >
              <Animated.View
                style={[
                  styles.flipCard,
                  { transform: [{ rotateY: frontInterpolate }] },
                ]}
              ></Animated.View>
              <Animated.View
                style={[
                  styles.flipCard,
                  styles.flipCardBack,
                  { transform: [{ rotateY: backInterpolate }] },
                ]}
              >
                <Image
                  source={image.image}
                  contentFit="contain"
                  style={styles.image}
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Modal animationType="fade" transparent visible={showDone}>
        <View style={styles.Modal}>
          <View style={styles.modalCOntainer}>
            <Image
              source={require("../assets/images/clapping.gif")}
              contentFit="fill"
              style={styles.clap}
            />
            <Text style={styles.clapText}>Well Done!</Text>

            {/* Try Again Button */}
            <TouchableOpacity
              onPress={restartGame}
              style={styles.tryAgainButton}
            >
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.closeContainer}
            >
              <Image
                source={require("../assets/images/delete.png")}
                contentFit="fill"
                style={styles.close}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </MainContainer>
  );
};

export default MemoryGame;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  board: {
    width: "60%",
    height: "95%",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#F6F8ED",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ab9984",
    padding: 10,
  },
  flipCard: {
    backfaceVisibility: "hidden",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  flipCardBack: {
    transform: [{ rotateY: "180deg" }],
  },
  image: {
    width: "90%",
    height: "90%",
  },
  hiddenText: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
    lineHeight: 100, // Adjust based on the height of the container
  },
  Modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCOntainer: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
    borderRadius: 30,
    backgroundColor: "white",
    position: "relative",
  },

  clap: {
    width: 100,
    height: 100,
  },
  clapText: {
    fontSize: 30,
    fontWeight: "700",
    color: "red",
  },
  closeContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  close: {
    height: 30,
    width: 30,
  },
  tryAgainButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  tryAgainText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
