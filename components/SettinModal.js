import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  FlatList,
} from "react-native";
import useUserPreferences from "../customHooks/useUserPreference";
import React, { useContext } from "react";
import { Context } from "../DataContext";
import ButtonSvg from "./ButtonSvg";

const SettinModal = ({ redirect }) => {
  const { fontSize, buttonFontColor, buttonSize } = useUserPreferences();
  const { sound, height } = useContext(Context);

  const buttons = [
    {
      title: "Setting",
      image: require("../assets/images/setting/setting.png"),
      action: () => {
        sound();
        redirect("Setting");
      },

      color: "#FF6EC7",
    },
    {
      title: "Progress",
      image: require("../assets/images/setting/progress.png"),
      action: () => {
        sound();
        redirect("Dashboard");
      },
      color: "#00CED1",
    },
    {
      title: "Exit",
      image: require("../assets/images/setting/exit.png"),
      action: () => {
        BackHandler.exitApp();
      },
      color: "#E6E6FA",
    },
  ];

  return (
    <View style={styles.settingContainerButton}>
      <FlatList
        data={buttons}
        keyExtractor={(item) => item.title}
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
              item.action();
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
              isBlack={item.title === "Exit"}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SettinModal;

const styles = StyleSheet.create({
  settingContainerButton: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddin: 0,
    margin: 0,
  },
  flatListContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
