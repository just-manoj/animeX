import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "react-native";

import Navigation from "./src/navigation/Navigation";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    PoetsenOne: require("./assets/fonts/PoetsenOne-Regular.ttf"),
    sfPro: require("./assets/fonts/SFPro-Regular.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Navigation />
      <StatusBar barStyle={"light-content"} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
