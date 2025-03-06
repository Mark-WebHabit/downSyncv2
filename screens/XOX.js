import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { putBorderRadius } from "../utilities/Border";
import MainContainer from "../components/MainContainer";

import { areAllElementPresent } from "../utilities/Arrays";

import ModalTieXox from "../components/ModelTieXox";
import ModelWinnerXox from "../components/ModelWinnerXox";
import { Context } from "../DataContext";
const images = {
  x: require("../assets/images/x.png"),
  o: require("../assets/images/o.png"),
};

const combination = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const XOX = ({ navigation }) => {
  const { sound } = useContext(Context);
  const [items, setItems] = useState(Array(9).fill(false));
  const [availableBlock, setAvailableBlock] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const [xMove, setXMove] = useState([]);
  const [oMove, setOMove] = useState([]);
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);
  const [showWinner, setShowWinner] = useState(false);

  // watch x's move
  useEffect(() => {
    if (xMove.length < 3) return;

    combination.forEach((com) => {
      if (areAllElementPresent(com, xMove)) {
        if (!winner) {
          setWinner("x");
          setShowWinner(true);
        }
      }
    });
  }, [xMove]);

  // watch o's move
  useEffect(() => {
    if (oMove.length < 3) return;

    combination.forEach((com) => {
      if (areAllElementPresent(com, oMove)) {
        if (!winner) {
          setWinner("o");
          setShowWinner(true);
        }
      }
    });
  }, [oMove]);

  // watch available block, if no element left and no winner then tie
  useEffect(() => {
    if (availableBlock.length == 0 && !winner && !showWinner) {
      setIsTie(true);
    }
  }, [availableBlock, winner, showWinner]);

  const move = (index) => {
    if (winner) {
      return;
    }

    if (!items[index]) {
      const newItems = [...items];
      newItems[index] = turn;
      if (turn == "x") {
        setXMove((old) => [...old, index]);
      } else {
        setOMove((old) => [...old, index]);
      }
      setItems(newItems);
      setTurn((prevTurn) => (prevTurn === "x" ? "o" : "x"));

      const remainingMove = availableBlock.filter((num) => num != index);

      setAvailableBlock(remainingMove);
    }
  };

  const tryAgain = () => {
    setItems(Array(9).fill(false));
    setAvailableBlock([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setXMove([]);
    setOMove([]);
    setTurn("x");
    setWinner(null);
    setIsTie(false);
    setShowWinner(false);
  };

  const Box = ({ index, el }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          sound();

          if (el) return;
          move(index);
        }}
      >
        <View
          style={[
            styles.box,
            {
              backgroundColor: "#EDE9E9",
              borderWidth: 2,
              borderColor: "#C7CEEA",
            },
            putBorderRadius(index),
          ]}
        >
          {el == "x" ? (
            <Image source={images["x"]} style={styles.el} />
          ) : el == "o" ? (
            <Image source={images["o"]} style={styles.el} />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <MainContainer
      addStyle={styles.container}
      showSetting={false}
      navigation={navigation}
    >
      <View style={styles.board}>
        {items.map((el, i) => (
          <Box index={i} el={el} key={i} />
        ))}
      </View>

      <View style={styles.turnInfo}>
        {turn == "x" ? (
          <Image source={images["x"]} style={styles.turnImg} />
        ) : (
          <Image source={images["o"]} style={styles.turnImg} />
        )}
      </View>
      <ModalTieXox isTie={isTie && !winner} close={() => setIsTie(!isTie)} />
      <ModelWinnerXox
        showWinner={showWinner}
        winner={winner}
        close={() => navigation.goBack()}
        tryAgain={tryAgain}
      />
    </MainContainer>
  );
};

export default XOX;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: -2,
  },
  board: {
    width: "50%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: "33%",
    aspectRatio: 1,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  el: {
    resizeMode: "contain",
    width: "80%",
  },
  turnInfo: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  turnImg: {
    resizeMode: "stretch",
    width: 80,
    height: 80,
  },
});
