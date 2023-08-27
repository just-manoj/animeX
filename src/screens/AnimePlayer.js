import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { BackHandler } from "react-native";
import { StatusBar } from "expo-status-bar";

const AnimePlayer = ({ navigation }) => {
  const videoRef = React.useRef(null);

  const changeOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  };

  const changeOriginalOrientation = async () => {
    navigation.navigate("AnimeEpisodes");
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  };

  useEffect(() => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      changeOriginalOrientation
    );
    // return () => {
    //   BackHandler.removeEventListener(
    //     "hardwareBackPress",
    //     changeOriginalOrientation
    //   );
    // };
  }, []);

  useEffect(() => {
    changeOrientation();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Video
        ref={videoRef}
        style={styles.video}
        useNativeControls
        source={require("../../assets/Video/ChainSawManSample.mp4")}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
      />
    </View>
  );
};

export default AnimePlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "#080808",
    paddingBottom: 10,
  },
  video: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
