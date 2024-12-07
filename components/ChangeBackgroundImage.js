import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";

const ChangeBackgroundImage = ({
  imageUri,
  setImagePreviewVisible,
  imagePreviewVisible,
}) => {
  return (
    <>
      {imageUri && (
        <TouchableOpacity
          onPress={() => setImagePreviewVisible(!imagePreviewVisible)}
          style={styles.togglePreviewButton}
        >
          <Text style={styles.togglePreviewText}>
            {imagePreviewVisible ? "Hide" : "Show"} Preview
          </Text>
        </TouchableOpacity>
      )}

      {/* Image Preview Box */}
      {imagePreviewVisible && (
        <ScrollView
          style={styles.imagePreviewBox}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Image
            source={{ uri: imageUri }}
            style={styles.imagePreview}
            resizeMode="stretch"
          />
        </ScrollView>
      )}
    </>
  );
};

export default ChangeBackgroundImage;

const styles = StyleSheet.create({
  imagePreviewBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  imagePreview: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 10,
    marginBottom: 10,
  },

  togglePreviewButton: {
    backgroundColor: "#FF4081",
    width: "50%",
    marginHorizontal: "auto",
    padding: 8,
    borderRadius: 5,
  },
  togglePreviewText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});
