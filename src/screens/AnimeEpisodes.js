import { View, Text, StyleSheet, FlatList, BackHandler } from "react-native";
import { useEffect, useState } from "react";

import { AnimeEpisode } from "../model/Anime";
import EpisodeDetails from "../components/AnimeEpisodes/EpisodeDetails";
import { container } from "../styles/styles";
import { getAnimeEpisodes } from "../util/Anime";

const AnimeEpisodes = ({ route, navigation }) => {
  const { animeName, season, animeCategory, singleSeason, backScreenName } =
    route.params || {};

  const [animeEpisodes, setAnimeEpisodes] = useState({});

  useEffect(() => {
    const backAction = () => {
      if (singleSeason) {
        navigation.navigate(backScreenName, {
          category: animeCategory,
        });
      } else {
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const fetchAnimeEpisodes = async () => {
      const fetchAnimeEpisodes = await getAnimeEpisodes(
        animeCategory,
        animeName,
        season
      );
      setAnimeEpisodes(fetchAnimeEpisodes.episodesList);
    };

    fetchAnimeEpisodes();
  }, []);
  return (
    <View style={container}>
      <View style={styles.headerContainer}>
        <Text style={styles.animeTitle}>{animeName}</Text>
        <Text style={styles.season}>Season {season}</Text>
      </View>
      <FlatList
        data={animeEpisodes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <EpisodeDetails {...item} />}
      />
    </View>
  );
};

export default AnimeEpisodes;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  animeTitle: {
    fontSize: 20,
    color: "#00ff40",
    fontFamily: "capriola",
  },
  season: {
    fontSize: 17,
    color: "#c8eb3b",
    fontFamily: "capriola",
    marginLeft: 60,
  },
});
