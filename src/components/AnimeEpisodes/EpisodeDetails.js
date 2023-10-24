import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const EpisodeDetails = (props) => {
  const { noOfEpisode, title, thumnailUrl, description, duration, onPress } =
    props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Image source={{ uri: thumnailUrl }} style={styles.image} />
        <View style={styles.imageOverContainer}>
          <Text style={styles.episodeNo}>#{noOfEpisode}</Text>
          <Text style={[styles.episodeNo, styles.timing]}>{duration}</Text>
        </View>
      </View>
      <View style={styles.descriptionContiner}>
        <Text numberOfLines={1} style={styles.episodeName}>
          {title}
        </Text>
        <Text numberOfLines={3} style={styles.desc}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EpisodeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#afa8b5",
    margin: 5,
    flexDirection: "row",
    borderRadius: 8,
  },
  image: {
    width: 125,
    height: "100%",
  },
  imageOverContainer: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  episodeNo: {
    color: "#63fcff",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    fontSize: 11,
    paddingHorizontal: 3,
    borderRadius: 4,
    marginRight: -0.5,
    marginTop: -1,
  },
  timing: {
    color: "#ffffff",
    fontSize: 9.5,
    marginBottom: -1,
  },
  descriptionContiner: {
    flex: 1,
    marginLeft: 7,
  },
  episodeName: {
    fontSize: 13.5,
    color: "#e51286",
  },
  desc: {
    fontSize: 12.5,
    color: "#493cff",
    marginBottom: 3,
  },
});
