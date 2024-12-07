import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";

const ChangeButtonSize = ({
  buttonSizeVisible,
  buttonSize,
  handleButtonSizeChange,
}) => {
  return (
    <>
      {buttonSizeVisible && (
        <View style={styles.previewButtonContaner}>
          <ImageBackground
            source={require("../assets/images/buttonbluebox.png")}
            style={[
              styles.previewButton,
              {
                transform: [
                  {
                    scale:
                      buttonSize == "medium"
                        ? 1
                        : buttonSize == "large"
                        ? 1.2
                        : 0.8,
                  },
                ],
              },
            ]}
          ></ImageBackground>
        </View>
      )}

      {/* Button Size Selection */}
      {buttonSizeVisible && (
        <View style={styles.buttonSizeContainer}>
          {["small", "medium", "large"].map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => handleButtonSizeChange(size)}
              style={[
                styles.buttonSizeButton,
                buttonSize === size && styles.selectedButtonSize, // Highlight selected size
              ]}
            >
              <Text style={styles.buttonSizeText}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

export default ChangeButtonSize;

const styles = StyleSheet.create({
  previewButtonContaner: {
    justifyContent: "center",
    alignItems: "center",
  },

  previewButton: {
    height: 150,
    width: 150,
  },

  buttonSizeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },

  buttonSizeText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  selectedButtonSize: {
    backgroundColor: "#FF4081", // Highlight selected size
  },

  buttonSizeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FF80AB", // Light pink
    borderRadius: 12,
    alignItems: "center",
  },
});
