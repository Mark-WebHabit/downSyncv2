import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Collapsible from "react-native-collapsible";
import { PieChart } from "react-native-chart-kit";

const CollapsibleEmotionMatching = ({
  emotionMatching,
  showEmotionMatching,
  user,
}) => {
  const completed = emotionMatching?.length
    ? emotionMatching.filter((el) => el.complete === true).length
    : 0;
  const pending = emotionMatching?.length
    ? emotionMatching.length - completed
    : 30;

  const data = [
    {
      name: "Completed",
      population: completed,
      color: "#F08080",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Pending",
      population: pending,
      color: "#23042C",
      legendFontColor: "#084C4F",
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
  };

  return (
    <Collapsible collapsed={!showEmotionMatching}>
      {emotionMatching && (
        <>
          <PieChart
            data={data}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <Text style={styles.info}>
            {user.user} has macthed {completed} out of {emotionMatching.length}{" "}
            Emotions Challenges
          </Text>
        </>
      )}
    </Collapsible>
  );
};

export default CollapsibleEmotionMatching;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Set background to white
  },
  info: {
    textAlign: "center",
    fontWeight: "700",
  },
});
