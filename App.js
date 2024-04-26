import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

import Navigation from "./src/navigation/Navigation";
import { store } from "./src/redux/store";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    PoetsenOne: require("./assets/fonts/PoetsenOne-Regular.ttf"),
    sfPro: require("./assets/fonts/SFPro-Regular.otf"),
    sfProMed: require("./assets/fonts/SFProMedium.otf"),
    cilokThere: require("./assets/fonts/Cilok-There.otf"),
    cheria: require("./assets/fonts/Cheria-DEMO.otf"),
    capriola: require("./assets/fonts/Capriola-Regular.ttf"),
    lucidaGrande: require("./assets/fonts/LucidaGrande.ttf"),
    lucidaGrandeBold: require("./assets/fonts/LucidaGrandeBold.ttf"),
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
      <Provider store={store}>
        <Navigation />
      </Provider>
      <StatusBar barStyle={"light-content"} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
