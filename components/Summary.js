import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Collapsible from "react-native-collapsible";
import { PieChart } from "react-native-chart-kit";
import { formatDuration, formatDurationOneParam } from "../utilities/Date";
import { ProgressContext } from "../GroupContext/Dashboard";

const Summary = ({ logins, user, showSummary }) => {
  const [highestDuration, setHighestDuration] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalGAme, setTotalGame] = useState(0);
  const {
    matchingEasy,
    matchingMedium,
    matchingHard,
    letters,
    dndObjects,
    colors,
    basicShapes,
    shapesMatching,
    emotionTypes,
    emotionMatching,
  } = useContext(ProgressContext);

  useEffect(() => {
    const durations = logins
      ? logins.map((el) => {
          return el.logoutTime - el.loginTime;
        })
      : [];

    if (durations.length > 0) {
      setHighestDuration(Math.max(...durations));
    } else {
      setHighestDuration(0);
    }
  }, [logins]);

  useEffect(() => {
    const calculateTotals = (categories) => {
      let completed = 0;
      let total = 0;
      categories.forEach((category) => {
        if (category) {
          total += category.length;
          category.forEach((element) => {
            if (element.complete) {
              completed++;
            }
          });
        }
      });
      setTotalGame(total);
      setTotalCompleted(completed);
    };
    calculateTotals([
      matchingEasy,
      matchingMedium,
      matchingHard,
      letters,
      dndObjects,
      colors,
      basicShapes,
      shapesMatching,
      emotionTypes,
      emotionMatching,
    ]);
  }, [
    matchingEasy,
    matchingMedium,
    matchingHard,
    letters,
    dndObjects,
    colors,
    basicShapes,
    shapesMatching,
    emotionTypes,
    emotionMatching,
  ]);

  const completed = totalCompleted;
  const pending = totalGAme - totalCompleted;

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
      color: "#062740",
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
    <Collapsible collapsed={!showSummary}>
      {logins && (
        <Text style={styles.totalLogin}>Total Logins {logins.length}</Text>
      )}
      {highestDuration > 0 && (
        <Text style={styles.totalLogin}>
          Longest Actvity {formatDurationOneParam(highestDuration)}
        </Text>
      )}

      <Text style={styles.desc}>{user.user} Overall Progress</Text>
      <Text style={styles.percent}>
        {((totalCompleted / totalGAme) * 100).toFixed(2)}%
      </Text>

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
    </Collapsible>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Set background to white
  },
  info: {
    textAlign: "center",
    fontWeight: "700",
  },

  totalLogin: {
    textAlign: "center",
    fontSize: 19,
    fontWeight: "700",
  },
  desc: {
    fontSize: 20,
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "600",
    marginTop: 10,
    color: "red",
  },

  percent: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "900",
  },
});
