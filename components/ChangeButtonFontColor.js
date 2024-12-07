import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import ColorPicker from "react-native-wheel-color-picker";

const ChangeButtonFontColor = ({ buttonColor, setButtonColor }) => {
  return (
    <View style={styles.colorPickerContainer}>
      <ImageBackground
        source={require("../assets/images/buttonmintbox.png")}
        style={styles.buttonPreview}
      >
        <Text style={{ ...styles.previewText, color: buttonColor }}>Text</Text>
      </ImageBackground>
      <ColorPicker
        onColorChange={(color) => setButtonColor(color)}
        color={buttonColor}
        style={styles.colorPicker}
        swatches={false}
        noSnap={true}
        sliderHidden={true}
        thumbSize={3}
      />
    </View>
  );
};

export default ChangeButtonFontColor;

const styles = StyleSheet.create({
  colorPickerContainer: {
    padding: 5,
    alignItems: "center",
  },
  colorPicker: {
    width: 200,
    height: 200,
  },

  buttonPreview: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  previewText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
