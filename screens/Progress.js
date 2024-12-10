import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import { ProgressContext } from "../GroupContext/Dashboard";
import SplashScreen from "./SplashScreen";
import { changeScreenOrientation } from "../utilities/Orientation";
import RecentLoginCollapse from "../components/RecentLoginCollapse";
import CollapsibleMatchingEasy from "../components/CollapsibleMatchingEasy";
import CollapsibleMatchingMedium from "../components/CollapsibleMatchingMedium";
import CollapsiblematchingHard from "../components/CollapsibleMatchingHard";
import Collapsibleletters from "../components/CollapsibleAlphabets";
import CollapsibleDandD from "../components/CollapsibleDandD";
import CollapsibleColors from "../components/CollapsibleColors";
import CollapsibleBAsicShapes from "../components/CollapsibleBAsicShapes";
import CollapsibleShapeMatching from "../components/CollapsibleShapeMatching";
import CollpasibleEmotionTypes from "../components/CollpasibleEmotionTypes";
import CollapsibleEmotionMatching from "../components/CollapsibleEmotionMatching";
import CollapsibleGameMatching from "../components/CollapsibleGameMatching";
import Summary from "../components/Summary";

const Progress = ({ navigation }) => {
  const {
    fetching,
    logins,
    matchingEasy,
    user,
    matchingMedium,
    matchingHard,
    letters,
    dndObjects,
    colors,
    basicShapes,
    shapesMatching,
    emotionTypes,
    emotionMatching,
    gameMatching,
  } = useContext(ProgressContext);

  const [showRecentLogin, setShowRecentLogin] = useState(false);
  const [showMathingEasy, setShowMatchingEasy] = useState(false);
  const [showMathingMedium, setShowMatchingMedium] = useState(false);
  const [showMathingHard, setShowMatchingHard] = useState(false);
  const [showAlphabets, setShowAlphabets] = useState(false);
  const [showDandD, setShowDandD] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showBasicShapes, setShowBasicShapes] = useState(false);
  const [showShapeMatching, setShowShapeMatching] = useState(false);
  const [showEmotionTypes, setShowEmotionTypes] = useState(false);
  const [showEmotionMatching, setShowEmotionMatching] = useState(false);
  const [showSummery, setShowSummary] = useState(false);
  const [showGameMatching, setShowGameMatching] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLogins, setFilteredLogins] = useState([]);

  useEffect(() => {
    try {
      changeScreenOrientation(true);
    } catch (error) {
      console.log(error);
    }

    return () => {
      changeScreenOrientation();
    };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const result = logins
        .filter((login) => login.uid === searchQuery)
        .sort((a, b) => b.loginTime - a.loginTime);

      setFilteredLogins(result);
    } else {
      setFilteredLogins([]);
    }
  }, [searchQuery, logins]);

  if (fetching) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowSummary(!showSummery)}
        >
          <Text style={styles.text}>Summary</Text>
          <Icon
            name={showSummery ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <Summary logins={logins} user={user} showSummary={showSummery} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowRecentLogin(!showRecentLogin)}
        >
          <Text style={styles.text}>Recent Login</Text>
          <Icon
            name={showRecentLogin ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <RecentLoginCollapse
          showRecentLogin={showRecentLogin}
          logins={logins}
          filteredLogins={filteredLogins}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowGameMatching(!showGameMatching)}
        >
          <Text style={styles.text}>Games Matching</Text>
          <Icon
            name={showGameMatching ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollapsibleGameMatching
          gameMatching={gameMatching}
          showGameMatching={showGameMatching}
          user={user}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowMatchingEasy(!showMathingEasy)}
        >
          <Text style={styles.text}>Animals Sound</Text>
          <Icon
            name={showMathingEasy ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollapsibleMatchingEasy
          matchingEasy={matchingEasy}
          showMathingEasy={showMathingEasy}
          user={user}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowMatchingMedium(!showMathingMedium)}
        >
          <Text style={styles.text}>Animal Name</Text>
          <Icon
            name={showMathingMedium ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollapsibleMatchingMedium
          matchingMedium={matchingMedium}
          showMathingMedium={showMathingMedium}
          user={user}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowMatchingHard(!showMathingHard)}
        >
          <Text style={styles.text}>Animal Description</Text>
          <Icon
            name={showMathingHard ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollapsiblematchingHard
          showMathingHard={showMathingHard}
          matchingHard={matchingHard}
          user={user}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowAlphabets(!showAlphabets)}
        >
          <Text style={styles.text}>Alphabets</Text>
          <Icon
            name={showAlphabets ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <Collapsibleletters
          showAlphabets={showAlphabets}
          letters={letters}
          user={user}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowDandD(!showDandD)}
        >
          <Text style={styles.text}>Drag and Drop</Text>
          <Icon
            name={showDandD ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollapsibleDandD
          showDandD={showDandD}
          dndObjects={dndObjects}
          user={user}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowColors(!showColors)}
        >
          <Text style={styles.text}>Colors</Text>
          <Icon
            name={showColors ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollapsibleColors
          colors={colors}
          showColors={showColors}
          user={user}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowBasicShapes(!showBasicShapes)}
        >
          <Text style={styles.text}>Shapes</Text>
          <Icon
            name={showBasicShapes ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollapsibleBAsicShapes
          basicShapes={basicShapes}
          showBasicShapes={showBasicShapes}
          user={user}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowShapeMatching(!showShapeMatching)}
        >
          <Text style={styles.text}>Shapes Matching</Text>
          <Icon
            name={showBasicShapes ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollapsibleShapeMatching
          shapesMatching={shapesMatching}
          showShapeMatching={showShapeMatching}
          user={user}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowEmotionTypes(!showEmotionTypes)}
        >
          <Text style={styles.text}>Types of Emotions</Text>
          <Icon
            name={showEmotionTypes ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollpasibleEmotionTypes
          showEmotionTypes={showEmotionTypes}
          emotionTypes={emotionTypes}
          user={user}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowEmotionMatching(!showEmotionMatching)}
        >
          <Text style={styles.text}>Emotions Matching</Text>
          <Icon
            name={showEmotionMatching ? "chevron-up" : "chevron-down"}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <CollapsibleEmotionMatching
          showEmotionMatching={showEmotionMatching}
          emotionMatching={emotionMatching}
          user={user}
        />

        <View
          style={{
            marginTop: 50,
          }}
        ></View>
      </ScrollView>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFEBEE",
    marginTop: 20,
  },
  button: {
    width: "95%",
    marginHorizontal: "auto",
    backgroundColor: "#74706f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
  },
  back: {
    width: "30%",
    aspectRatio: 4 / 1.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 100,
  },
  backText: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
    textAlign: "center",
  },
});
