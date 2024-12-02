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
import React, { useContext, useState } from "react";

import SettinModal from "./SettinModal";
import { Context } from "../DataContext";

const MainContainer = ({
  children,
  navigation,
  addStyle,
  showSetting = true,
  showBack = true,
}) => {
  const [showSettingModal, setShowSettingModal] = useState(false);

  const { sound, stop, speak } = useContext(Context);

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
        source={require("../assets/images/farm.jpg")}
        style={[styles.wrapper, addStyle]}
      >
        {/* main body */}
        <SettingButtons
          toggleSetting={toggleSetting}
          showSetting={showSetting}
          showBack={showBack}
          goBack={goBack}
        />
        <Img
          source={require("../assets/images/panda.gif")}
          style={styles.panda}
          contentFit="fill"
        />
        {children}
      </ImageBackground>

      {/* Setting modal */}
      <Modal visible={showSettingModal} transparent>
        <TouchableWithoutFeedback onPress={() => toggleSetting()}>
          <View style={styles.modalOverlay}>
            <SettinModal />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    zIndex: 2,
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
