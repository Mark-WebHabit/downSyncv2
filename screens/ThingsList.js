import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { useContext } from "react";
import MainContainer from "../components/MainContainer";
import ButtonSvg from "../components/ButtonSvg";

import useUserPreferences from "../customHooks/useUserPreference";
import { Context } from "../DataContext";

const buttons = [
  {
    title: "School",
    image: require("../assets/images/things/school.png"),
    screen: "SchoolSupplies",
    color: "#FFA500",
  },
  {
    title: "Wearables",
    image: require("../assets/images/things/waerable.png"),
    screen: "Wearables",
    color: "#8A2BE2",
  },
  {
    title: "Household",
    image: require("../assets/images/things/household.png"),
    screen: "Household",
    color: "#FF00FF",
  },
];

const ThingsList = ({ navigation }) => {
  const { buttonSize } = useUserPreferences();
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
                  scale: buttonSize * 1,
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

export default ThingsList;

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
