import {
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/AnimeDetails/Header";
import AnimeDetail from "../components/AnimeDetails/AnimeDetail";
import EpisodeDetail from "../components/AnimeDetails/EpisodeDetail";
import { getAnimeData, postAnimeToWishlist } from "../util/AnimeDetail";
import { getAnimeEpisodes } from "../util/Anime";
import Loading from "../components/common/Loading";

const AnimeDetails = ({ route, navigation }) => {
  const { animeName, animeCategory, backScreenName } = route.params || {};

  const [noOfSeason, setNoOfSeason] = useState(1);
  const [isPromoPlaying, setIsPromoPlaying] = useState(false);
  const [isPromoLoading, setIsPromoLoading] = useState(true);
  const [isMainContentLoading, setIsMainContentLoading] = useState(true);
  const [isEpisodeContentLoading, setIsEpisodeContentLoading] = useState(true);
  const [isPromoPlayingCompleted, setIsPromoPlayingCompleted] = useState(true);
  const [isTabbed, setIsTabbed] = useState(false);
  const [animeData, setAnimeData] = useState({});
  const [episodeData, setEpisodeData] = useState([]);

  const seasonHandler = (season) => {
    setNoOfSeason(() => {
      return season;
    });
    fetchAnimeEpisodeData(season);
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.positionMillis === status.durationMillis) {
      setIsPromoPlayingCompleted(() => {
        return true;
      });
    }
    if (status.isBuffering || !status.isLoaded) {
      setIsPromoLoading(() => {
        return true;
      });
    } else {
      setIsPromoLoading(() => {
        return false;
      });
    }
  };

  const fetchAnimeEpisodeData = async (season) => {
    setIsEpisodeContentLoading(true);
    const episodeData = await getAnimeEpisodes(
      animeCategory,
      animeName,
      season
    );
    setEpisodeData([...episodeData.episodesList]);
    setIsEpisodeContentLoading(false);
  };
  useEffect(() => {
    const fetchAnimeData = async () => {
      const animeData = await getAnimeData(animeCategory, animeName);
      setAnimeData(animeData);
      setIsMainContentLoading(false);
      fetchAnimeEpisodeData(1);
    };

    fetchAnimeData();
  }, []);

  const backAction = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        backAction();
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  const stopPromoPlayerHandler = () => {
    setIsPromoPlaying(false);
  };

  const wishlistHandler = async () => {
    const res = await postAnimeToWishlist(animeData.id);
    if (res.status === "success") {
      setAnimeData((prevData) => {
        return {
          ...prevData,
          isInWishlist: !prevData.isInWishlist,
        };
      });
    }
  };

  return isMainContentLoading ? (
    <Loading />
  ) : (
    <ScrollView style={styles.container}>
      {!isPromoPlayingCompleted ? (
        <>
          <Pressable
            onPress={() => {
              setIsTabbed(true);
              setTimeout(() => {
                setIsTabbed(false);
              }, 3000);
            }}
          >
            <Video
              source={{
                uri: animeData.promoUrl,
              }}
              style={styles.video}
              resizeMode={ResizeMode.COVER}
              shouldPlay={isPromoPlaying}
              useNativeControls={false} // Disable native controls
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
              onError={(error) => console.error("Video error: ", error)}
            />
          </Pressable>
          {isPromoLoading && (
            <View style={styles.controlContainer}>
              <ActivityIndicator size={"large"} color="#19ece8" />
            </View>
          )}
          {!isPromoLoading && isTabbed && (
            <View style={styles.controlContainer}>
              <Ionicons
                name={isPromoPlaying ? "pause" : "play"}
                size={70}
                color="#ffffff"
                onPress={() => {
                  setIsPromoPlaying(!isPromoPlaying);
                  setTimeout(() => {
                    setIsTabbed(false);
                  }, 3000);
                }}
              />
            </View>
          )}
        </>
      ) : (
        <Header
          key="header"
          playPromoHandler={() => {
            setIsPromoPlaying(true);
            setIsPromoPlayingCompleted(false);
          }}
          posterUrl={animeData.posterUrl}
        />
      )}
      <AnimeDetail
        key="animeDetail"
        currentSeason={noOfSeason}
        {...animeData}
        onChangeSeason={seasonHandler}
        onChangeWishlist={wishlistHandler}
      />
      {isEpisodeContentLoading ? (
        <Loading />
      ) : (
        <View style={styles.episodeContainer} key="episodeData">
          {episodeData.map((data) => {
            return (
              <EpisodeDetail
                {...data}
                key={data._id}
                onStopPromoPlayer={stopPromoPlayerHandler}
              />
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default AnimeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
  },
  episodeContainer: {
    marginTop: 20,
  },
  controlContainer: {
    position: "absolute",
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 300,
  },
});
