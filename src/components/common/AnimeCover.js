import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const AnimeCover = (props) => {
  const { animeName, coverUrl } = props || {};

  return (
    <View style={styles.coverContainer}>
      <Image source={coverUrl} style={styles.coverImage} />
      <Text style={styles.animeName} numberOfLines={1}>
        {animeName}
      </Text>
    </View>
  );
};

export default AnimeCover;

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
