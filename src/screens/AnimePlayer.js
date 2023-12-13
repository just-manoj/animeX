import { StyleSheet, View, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";

import { container } from "../styles/styles";

const AnimePlayer = ({ navigation, route }) => {
  const { videoUrl } = route.params;
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
        // source={require("../../assets/Video/ChainSawManSample.mp4")}
        // source={require("../../assets/Video/ToYouIn2000Years.mkv")}
        source={{
          // uri: `http://${DOMAIN}:27941/assets/Attack On Titan/Season 1/01 - To You, in 2000 Years.mkv`,
          uri: videoUrl,
        }}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        onError={(error) => console.error("Video error: ", error)}
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
