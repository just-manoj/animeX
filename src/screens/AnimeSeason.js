import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AnimeSeasonEpisodes } from "../model/Anime";

const SeasonCover = (props) => {
  const { noOfEpisode, noOfSeason } = props;
  const navigation = useNavigation();

  const goToEpisodesScreen = () => {
    navigation.navigate("AnimeEpisodes", {
      animeName: "Pokemon",
    });
  };
  return (
    <TouchableOpacity
      style={styles.seasonContainer}
      onPress={goToEpisodesScreen}
    >
      <Text style={styles.season}>Season {noOfSeason}</Text>
      <Text style={styles.episodes}>Episodes:{noOfEpisode}</Text>
    </TouchableOpacity>
  );
};

const AnimeSeason = ({ route }) => {
  const { animeName } = route.params;
  const episodes = [
    76, 25, 41, 58, 64, 40, 52, 52, 47, 51, 52, 52, 34, 48, 49, 45, 48, 45, 48,
    43, 48, 54, 48, 42, 42,
  ];
  const totalSeasons = episodes.map(
    (ep, index) => new AnimeSeasonEpisodes(index + 1, ep)
  );
  return (
    <View style={styles.container}>
      <Text style={styles.animeTitle}>{animeName}</Text>
      <FlatList
        data={totalSeasons}
        keyExtractor={(item) => item.noOfSeason}
        renderItem={({ item }) => (
          <SeasonCover
            noOfSeason={item.noOfSeason}
            noOfEpisode={item.noOfEpisodes}
          />
        )}
        style={{ marginBottom: 15 }}
      />
    </View>
  );
};

export default AnimeSeason;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "#080808",
  },
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
