import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import Modal from "react-native-modal";

import {
  createGameInstance,
  createLoginDocument,
} from "../utilities/CreateGameInstance";

// components
import Container from "../components/Container";
import { Context } from "../DataContext";
import { storeData } from "../utilities/LocalStorage";

const GetStarted = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [isMOdal, setIsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const { speak } = useContext(Context);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    setTimeout(() => {
      setIsModal(true);
    }, 500);
  }, []);

  const submit = async () => {
    const usernameRegex = /^[a-zA-Z]+$/;
    try {
      if (username === "") {
        speak("Please type your nickname");
        shake();
        return;
      }

      if (!usernameRegex.test(username)) {
        speak("Your nickname should only contain letters");
        shake();
        return;
      }

      setLoading(true);

      const userInfo = {
        username,
        createdAt: new Date().toISOString(),
      };

      await storeData("userInfo", userInfo);

      // // create the game instance here to make data in the database
      createLoginDocument(username);

      await createGameInstance();

      setLoading(false);
      setIsModal(false);
      navigation.navigate("Home");
    } catch (error) {
      console.log(`Error: ${error}`);
      Alert.alert(error.message);
      setLoading(false);
    }
  };

  return (
    <Container addStyle={styles.container}>
      <ImageBackground
        style={styles.wrapper}
        source={require("../assets/images/bg-crowded.jpeg")}
        resizeMode="cover"
      >
        {/* <View style={styles.absolute} /> */}

        <Modal
          isVisible={isMOdal}
          animationIn={"bounceInDown"}
          backdropOpacity={0}
        >
          <View style={styles.Modal}>
            <View style={styles.pandaContainer}>
              <Image
                source={require("../assets/images/panda-hi.png")}
                style={styles.panda}
              />
              <TouchableOpacity
                style={styles.speakerContainer}
                onPress={() => {
                  speak("What would you like me to call you?");
                }}
              >
                <Image
                  style={styles.speaker}
                  source={require("../assets/images/speaker-white.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.right}>
              <Text style={styles.GetStartedText}>
                What would you like me to call you?
              </Text>

              <Animated.View
                style={[
                  styles.inputContainer,
                  { transform: [{ translateX: shakeAnimation }] },
                ]}
              >
                <TextInput
                  placeholder="Type Here"
                  style={styles.input}
                  maxLength={20}
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
              </Animated.View>

              <TouchableOpacity style={styles.btn} onPress={submit}>
                {!loading ? (
                  <Text style={styles.btnText}>NEXT</Text>
                ) : (
                  <ActivityIndicator size={"small"} color={"#66519B"} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </Container>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    position: "relative",
  },
  Modal: {
    width: "60%",
    aspectRatio: 4 / 2,
    marginHorizontal: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    backgroundColor: "#66519B",
    flexDirection: "row",
  },
  pandaContainer: {
    height: "100%",
    width: "40%",
    justifyContent: "flex-end",
    position: "relative",
  },
  panda: {
    resizeMode: "stretch",
    width: "100%%",
    height: "95%",
  },
  right: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 10,
    gap: 10,
  },
  GetStartedText: {
    textAlign: "center",
    width: "100%",
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  speakerContainer: {
    position: "absolute",
    left: 5,
    top: 5,
    width: 30,
    height: 30,
  },
  speaker: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%",
  },
  btn: {
    width: 60,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF700",
    borderRadius: 10,
  },
  btnText: {
    textAlign: "center",
    color: "#66519B",
    fontWeight: "800",
  },
  inputContainer: {
    borderWidth: 1,
    width: "100%",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  input: {
    color: "white",
    fontWeight: "600",
  },
});
