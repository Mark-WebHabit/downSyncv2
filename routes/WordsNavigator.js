import { createStackNavigator } from "@react-navigation/stack";

import Words from "../screens/Words";
import Letter from "../screens/Letter";
import LetterExample from "../screens/LetterExample";

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
      </Stack.Navigator>
    </WordContextProvider>
  );
};

export default WordsNavigator;
