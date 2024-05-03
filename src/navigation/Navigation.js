import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "../screens/Main";
import CategorywiseAnime from "../screens/CategorywiseAnime";
import AnimePlayer from "../screens/AnimePlayer";
import Authentication from "../screens/Authentication";
import UserProfile from "../screens/UserProfile";
import AnimeDetails from "../screens/AnimeDetails";
import FavoriteEpisode from "../screens/FavoriteEpisode";

const navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="profile" component={UserProfile} />
        <Stack.Screen name="CategorywiseAnime" component={CategorywiseAnime} />
        <Stack.Screen name="AnimeDetails" component={AnimeDetails} />
        <Stack.Screen name="AnimePlayer" component={AnimePlayer} />
        <Stack.Screen name="FavoriteEpisode" component={FavoriteEpisode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;
