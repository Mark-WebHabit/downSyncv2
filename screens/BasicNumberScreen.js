import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import { Image } from "expo-image";
import { Context } from "../DataContext";

const BasicNumberScreen = ({ navigation }) => {
  const [current, setCurrent] = useState(0);
  const [delay, setDelay] = useState(false);
  const { speak } = useContext(Context);

  const numbers = [
    require("../assets/numbersgif/0.gif"),
    require("../assets/numbersgif/1.gif"),
    require("../assets/numbersgif/2.gif"),
    require("../assets/numbersgif/3.gif"),
    require("../assets/numbersgif/4.gif"),
    require("../assets/numbersgif/5.gif"),
    require("../assets/numbersgif/6.gif"),
    require("../assets/numbersgif/7.gif"),
    require("../assets/numbersgif/8.gif"),
    require("../assets/numbersgif/9.gif"),
    require("../assets/numbersgif/10.gif"),
  ];

  useEffect(() => {
    speak(`${current}!!!`);
  }, [current]);

  const handlePress = (increment) => {
    if (delay) return;
    setCurrent((old) => {
      const newVal = old + increment;
      return newVal >= 0 && newVal <= 10 ? newVal : old;
    });
    setDelay(true);
    setTimeout(() => setDelay(false), 200);
  };

  return (
    <MainContainer
      addStyle={styles.container}
      showSetting={false}
      navigation={navigation}
    >
      <View style={styles.wrapper}>
        {current > 0 && (
          <TouchableOpacity
            style={[styles.nav, { left: 0 }]}
            onPress={() => handlePress(-1)}
          >
            <Image
              source={require("../assets/images/left.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
        )}

        <Image style={styles.image} source={numbers[current]} />

        {current < 10 && (
          <TouchableOpacity
            style={[styles.nav, { right: 0 }]}
            onPress={() => handlePress(1)}
          >
            <Image
              source={require("../assets/images/right.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
        )}
      </View>
    </MainContainer>
  );
};

export default BasicNumberScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: "60%",
    height: "100%",
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    height: "90%",
    aspectRatio: 1,
  },
  nav: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -50 }],
  },
  arrow: {
    height: 60,
    aspectRatio: 1,
  },
});
