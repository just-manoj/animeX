import { StyleSheet, View, BackHandler, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";

import { container } from "../styles/styles";

const AnimePlayer = ({ navigation, route }) => {
  const { videoUrl } = route.params;
  const videoRef = React.useRef(null);
  const [isEpisodeLoading, setIsEpisodeLoading] = useState(true);

  const changeOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  };

  const changeOriginalOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isBuffering || !status.isLoaded) {
      setIsEpisodeLoading(() => {
        return true;
      });
    } else {
      setIsEpisodeLoading(() => {
        return false;
      });
    }

    if (status.positionMillis === status.durationMillis) {
      changeOriginalOrientation();
      navigation.goBack();
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        changeOriginalOrientation();
        navigation.goBack();
        return true;
      }
    );
    return () => backHandler.remove();
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
        source={{
          uri: videoUrl,
        }}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onError={(error) => console.error("Video error: ", error)}
      />
      {isEpisodeLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color="#19ece8" />
        </View>
      )}
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
  loadingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
