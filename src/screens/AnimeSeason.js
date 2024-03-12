import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

import { AnimeSeasonEpisodes } from "../model/Anime";
import { container } from "../styles/styles";
import { getNoOfSeasons } from "../util/Anime";
import { useState } from "react";

const SeasonCover = (props) => {
  const {
    noOfEpisode,
    noOfSeason,
    animeName,
    animeCategory,
    onGoToEpisodesScreen,
  } = props;

  return (
    <TouchableOpacity
      style={styles.seasonContainer}
      onPress={() =>
        onGoToEpisodesScreen({
          animeName: animeName,
          animeCategory: animeCategory,
          season: noOfSeason,
        })
      }
    >
      <Text style={styles.season}>Season {noOfSeason}</Text>
      <Text style={styles.episodes}>Episodes:{noOfEpisode}</Text>
    </TouchableOpacity>
  );
};

const AnimeSeason = ({ route, navigation }) => {
  const { animeName, animeCategory, backScreenName } = route.params || {};

  const [episodes, setEpisodes] = useState([]);
  const totalSeasons = episodes.map(
    (ep, index) => new AnimeSeasonEpisodes(index + 1, ep)
  );

  const goToEpisodesScreen = (animeData) => {
    navigation.navigate("AnimeEpisodes", {
      ...animeData,
    });
  };

  const goToLogInScreen = () => {
    navigation.navigate("Authentication");
  };

  useEffect(() => {
    const fetchSeasonsDetails = async () => {
      const response = await getNoOfSeasons(animeCategory, animeName);

      if (response.message == "Not Authtendicated..!") {
        goToLogInScreen();
      }

      if (response.episodes.length < 2) {
        goToEpisodesScreen({
          animeName: animeName,
          animeCategory: animeCategory,
          season: 1,
          singleSeason: true,
          backScreenName: backScreenName ? backScreenName : "AnimeSeason",
        });
      } else {
        setEpisodes(response.episodes);
      }
    };

    fetchSeasonsDetails();
  }, []);
  return (
    <View style={container}>
      <Text style={styles.animeTitle}>{animeName}</Text>
      <FlatList
        data={totalSeasons}
        keyExtractor={(item) => item.noOfSeason}
        renderItem={({ item }) => (
          <SeasonCover
            animeName={animeName}
            noOfSeason={item.noOfSeason}
            noOfEpisode={item.noOfEpisodes}
            animeCategory={animeCategory}
            onGoToEpisodesScreen={goToEpisodesScreen}
          />
        )}
        style={{ marginBottom: 15 }}
      />
    </View>
  );
};

export default AnimeSeason;

const styles = StyleSheet.create({
  animeTitle: {
    fontSize: 20,
    color: "#4790f0",
    fontFamily: "capriola",
  },
  seasonContainer: {
    marginVertical: 5,
    padding: 5,
    flex: 1,
    backgroundColor: "#33b691",
    alignItems: "center",
    borderRadius: 10,
  },
  season: {
    color: "#4f0c76",
    fontSize: 18,
    fontFamily: "lucidaGrandeBold",
  },
  episodes: {
    color: "white",
    fontSize: 13,
    fontFamily: "lucidaGrande",
  },
});
