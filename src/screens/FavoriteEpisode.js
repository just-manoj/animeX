import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getFavEpisodelist } from "../util/FavEpisode";

import { container } from "../styles/styles";
import EpisodeDetail from "../components/AnimeDetails/EpisodeDetail";
import CategorywiseHeader from "../components/common/CategorywiseHeader";
import { postEpisodeToFavlist } from "../util/AnimeDetail";
import EmptyData from "../components/common/EmptyData";

const FavoriteEpisode = () => {
  const [favEpisodes, setFavEpisodes] = useState([]);

  const favlistHandler = async (episodeId) => {
    const res = await postEpisodeToFavlist(episodeId);
    if (res.status === "success") {
      setFavEpisodes(
        favEpisodes.filter((preEpisodeData) => {
          return preEpisodeData._id !== episodeId;
        })
      );
    }
  };

  useEffect(() => {
    const getFavEpisodeHandler = async () => {
      const favEpisodesData = await getFavEpisodelist();
      setFavEpisodes(favEpisodesData.favList);
    };

    getFavEpisodeHandler();
  }, []);

  return (
    <View style={container}>
      <CategorywiseHeader animeCategory="Favorite List" isWishList={true} />
      {favEpisodes.length > 0 ? (
        <ScrollView>
          <View style={styles.episodeContainer} key="episodeData">
            {favEpisodes.map((data) => {
              return (
                <EpisodeDetail
                  {...data}
                  key={data._id}
                  onChangeFavList={favlistHandler}
                  isFavList={true}
                />
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <EmptyData>No Favorite Episodes</EmptyData>
      )}
    </View>
  );
};

export default FavoriteEpisode;

const styles = StyleSheet.create({
  episodeContainer: {
    marginTop: 20,
  },
});
