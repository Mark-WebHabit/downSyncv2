import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import MainContainer from "../components/MainContainer";
import ColorPicker from "react-native-wheel-color-picker";

const MixColors = ({ navigation }) => {
  const [firstColor, setFirstColor] = useState("#ffffff");
  const [secondColor, setSecondColor] = useState("#ffffff");
  const [mixed, setMixed] = useState("#fffff");

  const onFirstColorChange = (color) => {
    setFirstColor(color);
  };
  const onSecondColorChange = (color) => {
    setSecondColor(color);
  };
  const hexToRgb = (hex) => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return { r, g, b };
  };

  const rgbToHex = (r, g, b) => {
    r = r.toString(16).padStart(2, "0");
    g = g.toString(16).padStart(2, "0");
    b = b.toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  };

  const mixColors = (color1, color2, weight) => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const mix = (p, c1, c2) => Math.round((1 - p) * c1 + p * c2);
    const r = mix(weight, c1.r, c2.r);
    const g = mix(weight, c1.g, c2.g);
    const b = mix(weight, c1.b, c2.b);
    return rgbToHex(r, g, b);
  };

  useEffect(() => {
    const result = mixColors(firstColor, secondColor, 0.5);
    setMixed(result);
  }, [firstColor, secondColor]);

  return (
    <MainContainer navigation={navigation} showSetting={false}>
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <View style={[styles.box, { backgroundColor: firstColor }]}>
            <Text style={styles.Text}>{firstColor}</Text>
          </View>
          <Text
            style={{
              fontSize: 50,
              fontWeight: "bold",
            }}
          >
            +
          </Text>
          <View style={[styles.box, { backgroundColor: secondColor }]}>
            <Text style={styles.Text}>{secondColor}</Text>
          </View>
          <Text
            style={{
              fontSize: 50,
              fontWeight: "bold",
            }}
          >
            =
          </Text>
          <View style={[styles.box, { backgroundColor: mixed }]}>
            <Text style={styles.Text}>{mixed}</Text>
          </View>
        </View>
        <View style={styles.colorContainer}>
          <ColorPicker
            color={firstColor}
            onColorChange={(color) => onFirstColorChange(color)}
            swatches={false}
            noSnap={true}
            sliderHidden={true}
            thumbSize={3}
            wheelLodingIndicator={<ActivityIndicator size={40} />}
            sliderLodingIndicator={<ActivityIndicator size={20} />}
          />
          <ColorPicker
            color={secondColor}
            onColorChange={(color) => onSecondColorChange(color)}
            swatches={false}
            noSnap={true}
            sliderHidden={true}
            thumbSize={3}
            wheelLodingIndicator={<ActivityIndicator size={40} />}
            sliderLodingIndicator={<ActivityIndicator size={20} />}
          />
        </View>
      </View>
    </MainContainer>
  );
};

export default MixColors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  colorContainer: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
  },
  resultContainer: {
    width: "100%",
    height: "45%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  box: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
