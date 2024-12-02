import React, { useRef, useState, useEffect, useContext } from "react";
import { objects } from "../assets/objects_flatfiledb";
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Image,
  Text,
  Dimensions,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from "react-native";

import MainContainer from "../components/MainContainer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Context } from "../DataContext";
import NiceTryModal from "../components/NiceTryModal";
import { usePlayMp3 } from "../customHooks/PlaySound";
import { updateDandDComplete } from "../utilities/Database";

const DragDrop = ({ navigation, route }) => {
  const item = route.params;

  const [ndx, setNdx] = useState(Math.floor(Math.random() * 3));
  const [items, setItems] = useState([item]);
  const clap = usePlayMp3(require("../assets/sounds/clapping.mp3"));
  const { speak, stop } = useContext(Context);
  const [showHint, setSHowHint] = useState(false);
  const [done, setDOne] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [isInBox, setIsInBox] = useState(false);
  const initialPositions = [
    { x: getRandomPosition(screenWidth), y: getRandomPosition(screenHeight) },
    { x: getRandomPosition(screenWidth), y: getRandomPosition(screenHeight) },
    { x: getRandomPosition(screenWidth), y: getRandomPosition(screenHeight) },
  ];

  function getRandomPosition(max) {
    // Generate a random position within the screen bounds
    const padding = 150; // Ensuring images do not start inside the box
    return Math.floor(Math.random() * (max - padding * 2) + padding);
  }

  const pan1 = useRef(new Animated.ValueXY(initialPositions[0])).current;
  const pan2 = useRef(new Animated.ValueXY(initialPositions[1])).current;
  const pan3 = useRef(new Animated.ValueXY(initialPositions[2])).current;

  useEffect(() => {
    const arr = [];
    arr[ndx] = item;
    let ndx2 = ndx;
    let ndx3 = ndx;
    while (ndx2 === ndx) {
      ndx2 = Math.floor(Math.random() * 3);
    }
    while (ndx3 === ndx || ndx3 === ndx2) {
      ndx3 = Math.floor(Math.random() * 3);
    }

    let item2 = item;
    let item3 = item;
    while (item2.description === item.description) {
      item2 = objects[Math.floor(Math.random() * objects.length)];
    }
    while (
      item3.description === item.description ||
      item2.description === item3.description
    ) {
      item3 = objects[Math.floor(Math.random() * objects.length)];
    }
    arr[ndx2] = item2;
    arr[ndx3] = item3;
    setItems(arr);
  }, [item]);

  useEffect(() => {
    stop();
    if (showHint) {
      speak(item.description);
    }
  }, [showHint]);

  useEffect(() => {
    if (isInBox) {
      updateDandDComplete(item.uid);
      setDOne(true);
    }
  }, [isInBox]);

  useEffect(() => {
    if (done) {
      clap();
    }
  }, [done]);

  const createPanResponder = (pan, imageId) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isInBox, // Disable responder if correct image is in the box
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
        pan.flattenOffset();
        if (isDroppedInBox(gesture)) {
          if (items[imageId - 1]?.name === item.name) {
            setIsInBox(true);
            Animated.spring(pan, {
              toValue: { x: screenWidth / 2 - 75, y: screenHeight / 2 - 75 }, // Adjusted to center the image in the box
              useNativeDriver: false,
            }).start();
          } else {
            //means wrong
            setIsInBox(false);
            Animated.spring(pan, {
              toValue: initialPositions[imageId - 1],
              useNativeDriver: false,
            }).start();
          }
        } else if (
          gesture.moveX < 0 ||
          gesture.moveX > screenWidth ||
          gesture.moveY < 0 ||
          gesture.moveY > screenHeight
        ) {
          Animated.spring(pan, {
            toValue: initialPositions[imageId - 1],
            useNativeDriver: false,
          }).start();
        } else {
        }
      },
    });

  const panResponder1 = createPanResponder(pan1, 1);
  const panResponder2 = createPanResponder(pan2, 2);
  const panResponder3 = createPanResponder(pan3, 3);

  const isDroppedInBox = (gesture) => {
    const dropBoxX = screenWidth / 2;
    const dropBoxY = screenHeight / 2;
    const boxSize = 150; // Adjusted box size

    return (
      gesture.moveX > dropBoxX - boxSize / 2 &&
      gesture.moveX < dropBoxX + boxSize / 2 &&
      gesture.moveY > dropBoxY - boxSize / 2 &&
      gesture.moveY < dropBoxY + boxSize / 2
    );
  };

  return (
    <MainContainer navigation={navigation} showSetting={false}>
      <NiceTryModal show={done} hide={() => setDOne(false)} />
      {items.length && items.length > 0 && (
        <View style={styles.container}>
          <Modal visible={showHint} transparent animationType="fade">
            <View style={styles.containerModa}>
              <Text style={styles.hintTxt}>{item.description}</Text>
              <TouchableOpacity
                style={styles.close}
                onPress={() => setSHowHint(false)}
              >
                <Image
                  source={require("../assets/images/delete.png")}
                  style={styles.closeImg}
                />
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.hint}
            onPress={() => setSHowHint(true)}
          >
            <Image
              source={require("../assets/images/hint.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
          <ImageBackground
            style={[styles.dropBox, { width: 150, height: 150 }]}
            source={require("../assets/images/buttonbluebox.png")}
          >
            <Text style={styles.text}>DROP HERE</Text>
          </ImageBackground>
          <Animated.View
            {...panResponder1.panHandlers}
            style={[pan1.getLayout(), styles.draggable]}
          >
            <Image
              source={items[0]?.image}
              style={[styles.image, { width: 150, height: 150 }]} // Adjusted image size
            />
          </Animated.View>
          <Animated.View
            {...panResponder2.panHandlers}
            style={[pan2.getLayout(), styles.draggable]}
          >
            <Image
              source={items[1]?.image}
              style={[styles.image, { width: 150, height: 150 }]} // Adjusted image size
            />
          </Animated.View>
          <Animated.View
            {...panResponder3.panHandlers}
            style={[pan3.getLayout(), styles.draggable]}
          >
            <Image
              source={items[2]?.image}
              style={[styles.image, { width: 150, height: 150 }]} // Adjusted image size
            />
          </Animated.View>
          {/* {isInBox && <Text style={styles.status}>Correct Image!</Text>} */}
        </View>
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dropBox: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    position: "absolute",
    top: Dimensions.get("window").height / 2 - 75, // Adjusted for new box size
    left: Dimensions.get("window").width / 2 - 75, // Adjusted for new box size
    borderRadius: 10,
  },
  draggable: {
    width: 150, // Adjusted for new image size
    height: 150, // Adjusted for new image size
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
  status: {
    fontSize: 20,
    color: "#00a",
    marginTop: 20,
  },
  error: {
    fontSize: 20,
    color: "red",
    marginTop: 20,
  },
  hint: {
    resizeMode: "stretch",
    position: "absolute",
    width: 100,
    height: 100,
    top: 5,
    right: 5,
  },
  containerModa: {
    height: "50%",
    aspectRatio: 4 / 1.7,
    borderRadius: 10,
    backgroundColor: "white",
    marginHorizontal: "auto",
    marginVertical: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  hintTxt: {
    fontSize: 20,
    textAlign: "center",
    width: "80%",
  },
  close: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  closeImg: {
    width: 30,
    height: 30,
  },
});

export default DragDrop;
