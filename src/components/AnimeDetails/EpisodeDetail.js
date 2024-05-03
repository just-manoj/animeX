import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const EpisodeDetail = (props) => {
  const {
    _id,
    title,
    description,
    videoUrl,
    duration,
    noOfEpisode,
    thumnailUrl,
    onStopPromoPlayer,
    isInFavList,
    onChangeFavList,
    isFavList,
    anime,
    noOfSeason,
  } = props || {};

  const navigation = useNavigation();

  const [isExpand, setIsExpand] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageLoadedHandler = () => {
    setIsImageLoaded(() => {
      return true;
    });
  };

  const imageErrorHandler = () => {
    setIsImageLoaded(() => {
      return false;
    });
  };

  const playerScreenHandler = () => {
    if (!isFavList) {
      onStopPromoPlayer();
    }
    navigation.navigate("AnimePlayer", {
      videoUrl: videoUrl,
    });
  };

  const displayDuration = (duration) => {
    const [hoursStr, minutesStr, secondsStr] = duration.split(":");
    const hours = parseInt(hoursStr, 10) || 0; // Default to 0 if hours is not provided
    const minutes = parseInt(minutesStr, 10) || 0; // Default to 0 if minutes is not provided
    const seconds = parseInt(secondsStr, 10) || 0; // Default to 0 if seconds is not provided
    let result = "";
    if (seconds) {
      if (hours > 0) {
        result += `${hours}hr `;
      }
      if (minutes > 0) {
        result += `${minutes}m`;
      }
    } else {
      result += `${hours}m `;
    }
    return result.trim(); // Trim any leading or trailing spaces
  };
  return (
    <View style={styles.container}>
      {isFavList && (
        <View style={[styles.titleContainer, { marginBottom: 5 }]}>
          <Text style={[styles.title]}>{anime}</Text>
          <Text style={[styles.duration]}>S{noOfSeason}</Text>
        </View>
      )}
      <TouchableOpacity onPress={playerScreenHandler}>
        <Image
          source={{
            uri: thumnailUrl,
          }}
          style={styles.thumnail}
          onLoad={imageLoadedHandler}
          onError={imageErrorHandler}
        />
        <View style={styles.iconContainer}>
          {isImageLoaded ? (
            <AntDesign
              name="playcircleo"
              size={60}
              color="#ffffff"
              style={{
                backgroundColor: "rgba(209, 206, 206, 0.4)",
                borderRadius: 100,
              }}
            />
          ) : (
            <ActivityIndicator size={"large"} color="#19ece8" />
          )}
        </View>
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {isFavList
              ? `Ep${noOfEpisode} ${title}`
              : `${noOfEpisode}. ${title}`}
          </Text>
          <Text style={styles.duration}>{displayDuration(duration)}</Text>
        </View>
        <Pressable
          onPress={() => {
            setIsExpand(!isExpand);
          }}
          style={styles.descriptionContainer}
        >
          <Text
            style={styles.description}
            {...(!isExpand && { numberOfLines: 2 })}
          >
            {description}
          </Text>
          <AntDesign
            name={isInFavList ? "star" : "staro"}
            size={27}
            color="#ffffff"
            style={{ marginTop: 5 }}
            onPress={() => {
              onChangeFavList(_id);
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default EpisodeDetail;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 15,
  },
  iconContainer: {
    position: "absolute",
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  thumnail: {
    width: "100%",
    height: 200,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    width: "85%",
    color: "white",
    fontFamily: "sfProMed",
    fontSize: 15.5,
  },
  duration: {
    color: "white",
    fontFamily: "sfProMed",
    fontSize: 15.5,
  },
  descriptionContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  description: {
    width: "90%",
    marginTop: 5,
    color: "white",
    fontFamily: "sfPro",
    fontSize: 13.5,
    lineHeight: 20,
  },
});
