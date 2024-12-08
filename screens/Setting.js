import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { changeScreenOrientation } from "../utilities/Orientation";
import { updateUsername } from "../utilities/Database";
import {
  getPreference,
  getSavedUser,
  removePreference,
  savePreference,
} from "../utilities/preferences";
import * as ScreenOrientation from "expo-screen-orientation";
import * as ImagePicker from "expo-image-picker";

import ChangeButtonFontColor from "../components/ChangeButtonFontColor";
import UpdateUsernameModal from "../components/UpdateUsernameModal";
import ChangeButtonSize from "../components/ChangeButtonSize";
import ChangeBackgroundImage from "../components/ChangeBackgroundImage";

const Setting = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState("");
  const [dimensionWidth, setDimensionWidth] = useState(0);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [buttonSizeVisible, setButtonSizeVisible] = useState(false);
  const [buttonColor, setButtonColor] = useState("#DD2525");
  const [buttonSize, setButtonSize] = useState("medium"); // Track selected size

  // Image selection state
  const [imageUri, setImageUri] = useState(null);
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);

  useEffect(() => {
    (async function () {
      const currentUser = await getSavedUser();
      setUser(currentUser.user);
    })();

    (async function () {
      const bs = await getPreference("buttonSize");

      if (bs == null) {
        setButtonSize("medium");
      } else {
        setButtonSize(bs);
      }
    })();
  }, []);

  useEffect(() => {
    const updateDimensions = async () => {
      const orientation = await ScreenOrientation.getOrientationAsync();
      const isPortrait =
        orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
        orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN;
      const windowWidth = isPortrait
        ? Dimensions.get("window").width
        : Dimensions.get("window").height;

      setDimensionWidth(windowWidth);
    };

    try {
      changeScreenOrientation(true);
      updateDimensions();
    } catch (error) {
      console.log(error);
    }

    return () => {
      changeScreenOrientation();
    };
  }, []);

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z]+$/;

    if (username.length > 10) {
      setErrorMessage("Username too long");
      return false;
    }
    if (!regex.test(username)) {
      setErrorMessage(
        "Username must be characters only with no special characters or numbers."
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleUsernameChange = async () => {
    if (validateUsername(newUsername)) {
      // Handle the username change logic here
      updateUsername(newUsername);
      savePreference("user", newUsername);
      setUser(newUsername);
      setModalVisible(false);
    }
  };

  const handleSave = async () => {
    if (buttonColor) {
      await savePreference("buttonFontColor", buttonColor);
    }
    if (buttonSize) {
      await savePreference("buttonSize", buttonSize);
    }

    if (imageUri) {
      await savePreference("backgroundImage", imageUri);
    }

    navigation.navigate("Home");
  };

  const handleButtonSizeChange = (size) => {
    setButtonSize(size); // Update button size selection
  };

  // Handle image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileExtension = uri.split(".").pop();

      // Allow only JPG and PNG formats
      if (
        fileExtension === "jpg" ||
        fileExtension === "png" ||
        fileExtension === "jpeg"
      ) {
        setImageUri(uri);
        setImagePreviewVisible(true);
      } else {
        alert("Only JPG and PNG images are allowed.");
      }
    }
  };

  const handleReset = async () => {
    await removePreference("buttonFontColor");
    await removePreference("buttonSize");
    await removePreference("backgroundImage");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {dimensionWidth > 0 && (
        <Image
          source={require("../assets/logos/logo_splash.png")}
          style={{
            ...styles.Image,
            width: dimensionWidth * 0.3,
            height: dimensionWidth * 0.3,
          }}
          resizeMode="stretch"
        />
      )}
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>{user}</Text>
        <TouchableOpacity
          style={styles.pencilContainer}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("../assets/images/edit.png")}
            style={styles.edit}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.containerScroll}
        contentContainerStyle={{
          ...styles.scrollViewContent,
        }}
      >
        <TouchableOpacity
          onPress={() => setButtonSizeVisible(!buttonSizeVisible)}
          style={[
            styles.colorPickerToggle,
            {
              backgroundColor: "#98FF98",
            },
          ]}
        >
          <Text style={styles.colorPickerToggleText}>Button Size</Text>
        </TouchableOpacity>

        <ChangeButtonSize
          buttonSizeVisible={buttonSizeVisible}
          buttonSize={buttonSize}
          handleButtonSizeChange={handleButtonSizeChange}
        />

        <TouchableOpacity
          onPress={() => setColorPickerVisible(!colorPickerVisible)}
          style={[
            styles.colorPickerToggle,
            {
              backgroundColor: "#40E0D0",
            },
          ]}
        >
          <Text style={styles.colorPickerToggleText}>Button Text Color</Text>
        </TouchableOpacity>
        {colorPickerVisible && (
          <ChangeButtonFontColor
            buttonColor={buttonColor}
            setButtonColor={setButtonColor}
          />
        )}

        {/* Add Image Picker Button */}
        <TouchableOpacity onPress={pickImage} style={styles.colorPickerToggle}>
          <Text style={styles.colorPickerToggleText}>Background Image</Text>
        </TouchableOpacity>
        <ChangeBackgroundImage
          imageUri={imageUri}
          setImagePreviewVisible={setImagePreviewVisible}
          imagePreviewVisible={imagePreviewVisible}
        />
        <TouchableOpacity
          onPress={() => handleSave()}
          style={[
            styles.colorPickerToggle,
            {
              backgroundColor: "#FF7F50",
            },
          ]}
        >
          <Text style={styles.colorPickerToggleText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleReset()}
          style={[
            styles.colorPickerToggle,
            {
              backgroundColor: "#FFD700",
            },
          ]}
        >
          <Text style={styles.colorPickerToggleText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.colorPickerToggle,
            {
              backgroundColor: "#87CEEB",
            },
          ]}
        >
          <Text style={styles.colorPickerToggleText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>

      <UpdateUsernameModal
        modalVisible={modalVisible}
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        setModalVisible={setModalVisible}
        handleUsernameChange={handleUsernameChange}
      />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFEBEE", // Soft pink background
  },

  containerScroll: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  scrollViewContent: {},

  nameWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexDirection: "row",
    gap: 15,
    marginTop: 40,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF4081", // Bright pink color
    fontFamily: "Comic Sans MS", // Playful font
    letterSpacing: 2,
  },

  pencilContainer: {
    backgroundColor: "#FFEB3B", // Bright yellow
    borderRadius: 50,
    padding: 10,
  },
  edit: {
    width: 25,
    height: 25,
  },

  colorPickerToggle: {
    padding: 12,
    backgroundColor: "#E6E6FA", // Light pink
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  colorPickerToggleText: {
    color: "#5C0404",
    fontWeight: "bold",
    fontSize: 24,
    fontFamily: "Comic Sans MS", // Playful font
  },

  Image: {
    borderRadius: 20,
    marginTop: 40,
  },
});
