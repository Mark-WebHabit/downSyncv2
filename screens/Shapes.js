import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useContext } from "react";
import MainContainer from "../components/MainContainer";
import ButtonSvg from "../components/ButtonSvg";

import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";

const buttons = [
  {
    title: "Basic",
    image: require("../assets/images/art/shape.png"),
    screen: "ShapesBasic",
    color: "#FF69B4",
  },
  {
    title: "Recognize",
    image: require("../assets/images/art/recognize.png"),
    screen: "MatchShapes",
    color: "#8A2BE2",
  },
];

const Shapes = ({ navigation }) => {
  const { fontSize, buttonFontColor, buttonSize } = useUserPreferences();
  const { sound, height } = useContext(Context);

  return (
    <MainContainer
      showBack={true}
      showSetting={false}
      addStyle={styles.container}
      navigation={navigation}
    >
      <FlatList
        data={buttons}
        keyExtractor={(item) => item.screen}
        numColumns={1}
        contentContainerStyle={styles.flatListContainer}
        style={{ width: "80%" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              transform: [
                {
                  scale: buttonSize * 1.2,
                },
                {
                  scaleX: index % 2 == 1 ? -1 : 1,
                },
              ],
            }}
            onPress={() => {
              sound();
              navigation.navigate(item.screen);
            }}
          >
            <ButtonSvg
              style={{
                height: height / 4,
                width: (height / 5) * 3,
              }}
              img={item.image}
              bgColor={item.color}
              text={item.title}
              index={index}
              fontSize={item.title === "Mood Match" ? 50 : 60}
            />
          </TouchableOpacity>
        )}
      />
    </MainContainer>
  );
};

export default Shapes;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
    paddin: 0,
    margin: 0,
  },
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
