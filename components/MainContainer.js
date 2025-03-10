import {
  Image,
  ImageBackground,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Image as Img } from "expo-image";
import SettingButtons from "./SettingButtons";
import React, { useContext, useEffect, useState } from "react";

import SettinModal from "./SettinModal";
import { Context } from "../DataContext";
import { getPreference } from "../utilities/preferences";
import { changeScreenOrientation } from "../utilities/Orientation";

const MainContainer = ({
  children,
  navigation,
  addStyle,
  showSetting = true,
  showBack = true,
}) => {
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [bg, setBg] = useState(null);

  const { sound, stop, speak } = useContext(Context);

  useEffect(() => {
    changeScreenOrientation();
    (async function () {
      const response = await getPreference("backgroundImage");
      setBg(response);
    })();
  }, []);

  const toggleSetting = () => {
    sound();
    setShowSettingModal(!showSettingModal);
  };

  const goBack = () => {
    stop();
    sound();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bg ? { uri: bg } : require("../assets/images/rainbow.jpg")}
        style={[styles.wrapper, addStyle]}
      >
        {/* main body */}
        <SettingButtons
          toggleSetting={toggleSetting}
          showSetting={showSetting}
          showBack={showBack}
          goBack={goBack}
          navigation={navigation}
        />

        {children}
      </ImageBackground>

      {/* Setting modal */}
      <Modal visible={showSettingModal} transparent>
        <TouchableWithoutFeedback onPress={() => toggleSetting()}>
          <View style={styles.modalOverlay}>
            <SettinModal
              redirect={(param) => {
                toggleSetting();
                navigation.navigate(param);
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -2,
  },
  wrapper: {
    flex: 1,
    position: "relative",
  },

  panda: {
    position: "absolute",
    bottom: 0,
    left: 10,
    height: 250,
    width: 200,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
