import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "../screens/Main";
import CategorywiseAnime from "../screens/CategorywiseAnime";
import AnimeSeason from "../screens/AnimeSeason";
import AnimeEpisodes from "../screens/AnimeEpisodes";
import AnimePlayer from "../screens/AnimePlayer";
import Authentication from "../screens/Authentication";

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
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="CategorywiseAnime" component={CategorywiseAnime} />
        <Stack.Screen name="AnimeSeason" component={AnimeSeason} />
        <Stack.Screen name="AnimeEpisodes" component={AnimeEpisodes} />
        <Stack.Screen name="AnimePlayer" component={AnimePlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;
