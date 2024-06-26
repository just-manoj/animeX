import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import React from "react";

const AnimeCoverImage = (props) => {
  const {
    animeId,
    animeName,
    coverUrl,
    VerticalStyle,
    animeCategory,
    backScreenName,
    isWishList,
    onWishlistHandler,
  } = props || {};
  const navigation = useNavigation();

  const goToSeasonsScreen = () => {
    navigation.navigate("AnimeDetails", {
      animeName: animeName,
      animeCategory: animeCategory,
      backScreenName: backScreenName ? backScreenName : "CategorywiseAnime",
    });
  };

  return (
    <TouchableOpacity
      style={[styles.coverContainer, VerticalStyle]}
      onPress={goToSeasonsScreen}
      onLongPress={() => {
        if (isWishList) {
          onWishlistHandler(animeId, animeName);
        }
      }}
    >
      <Image source={{ uri: coverUrl }} style={styles.coverImage} />
      <Text style={styles.animeName} numberOfLines={1}>
        {animeName}
      </Text>
    </TouchableOpacity>
  );
};

export default AnimeCoverImage;

const styles = StyleSheet.create({
  coverContainer: {
    width: 135,
    alignItems: "center",
  },
  coverImage: {
    width: 125,
    height: 180,
    resizeMode: "cover",
    marginRight: 6,
  },
  animeName: {
    marginTop: 7,
    fontSize: 16,
    fontFamily: "cheria",
    color: "white",
  },
});
