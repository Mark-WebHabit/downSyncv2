import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import MainContainer from "../components/MainContainer";
import { updateMatching } from "../utilities/Database";
import { ArtContext } from "../GroupContext/ArtsContext";

const ColorsLevel = ({ navigation, route }) => {
  const { item } = route.params;
  const { colors, setColors } = useContext(ArtContext);

  useEffect(() => {
    (async function () {
      await updateMatching(item.uid, "colors", setColors, colors);
    })();
  }, []);

  return (
    <MainContainer navigation={navigation} showSetting={false}>
      <View style={styles.container}>
        <View
          style={[
            styles.box,
            {
              backgroundColor: item.hex,
            },
          ]}
        ></View>
        <Text
          style={[
            styles.small,
            {
              color: item.hex,
            },
          ]}
        >
          {item.hex}
        </Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </MainContainer>
  );
};

export default ColorsLevel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 20,
  },
  name: {
    fontSize: 40,
  },
  description: {
    marginVertical: 10,
    fontSize: 30,
  },
});
