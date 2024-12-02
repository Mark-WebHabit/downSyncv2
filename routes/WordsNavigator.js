import { createStackNavigator } from "@react-navigation/stack";

import Words from "../screens/Words";
import Letter from "../screens/Letter";
import LetterExample from "../screens/LetterExample";
import Pronunciations from "../screens/Pronunciations";
import PronounceWord from "../screens/PronounceWord";
import DragDrop from "../screens/DragAndDrop";
import DandDList from "../screens/DandDList";

const Stack = createStackNavigator();

import WordContextProvider from "../GroupContext/WordsContext";
const WordsNavigator = () => {
  return (
    <WordContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="wordsCategory" component={Words} />
        <Stack.Screen name="Letters" component={Letter} />
        <Stack.Screen name="LetterSample" component={LetterExample} />
        <Stack.Screen name="Pronunciation" component={Pronunciations} />
        <Stack.Screen name="PronounceWord" component={PronounceWord} />
        <Stack.Screen name="DandDList" component={DandDList} />
        <Stack.Screen name="DandD" component={DragDrop} />
      </Stack.Navigator>
    </WordContextProvider>
  );
};

export default WordsNavigator;
