import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "../screens/Main";
import CategorywiseAnime from "../screens/CategorywiseAnime";
import AnimeSeason from "../screens/AnimeSeason";
import AnimeEpisode from "../screens/AnimeEpisode";

const navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="CategorywiseAnime" component={CategorywiseAnime} />
        <Stack.Screen name="AnimeSeason" component={AnimeSeason} />
        <Stack.Screen name="AnimeEpisode" component={AnimeEpisode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;
