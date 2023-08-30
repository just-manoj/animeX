import { StyleSheet, View, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";

import { container } from "../styles/styles";

const AnimePlayer = ({ navigation }) => {
  const videoRef = React.useRef(null);

  const changeOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  };

  const changeOriginalOrientation = async () => {
    navigation.goBack();
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  };

  useEffect(() => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      changeOriginalOrientation
    );
  }, []);

  useEffect(() => {
    changeOrientation();
  }, []);

  return (
    <View style={container}>
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
  video: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
