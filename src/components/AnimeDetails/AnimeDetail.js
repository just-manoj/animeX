import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const AnimeDetail = (props) => {
  const {
    name,
    description,
    category,
    noOfSeason,
    currentSeason,
    noOfEpisodes,
    onChangeSeason,
    rating,
    studio,
    isInWishlist,
    onChangeWishlist,
  } = props || {};
  const [isExpand, setIsExpand] = useState(false);
  // const [isInWishList, setIsInWishList] = useState(false);

  const SeasonComponents = (season) => {
    const seasonComponents = [];

    for (let i = 0; i < season; i++) {
      const key = `season-${i}`;

      const component = (
        <Pressable
          key={key}
          style={[
            styles.seasonTextContainer,
            currentSeason === i + 1 && { backgroundColor: "#ffffff" },
          ]}
          onPress={() => {
            onChangeSeason(i + 1);
          }}
        >
          <Text
            style={[
              styles.text,
              styles.seasonText,
              currentSeason === i + 1 && { color: "#000000" },
            ]}
          >
            {i + 1}
          </Text>
        </Pressable>
      );
      seasonComponents.push(component);
    }

    return seasonComponents;
  };

  return (
    <View style={styles.container}>
      <View style={styles.animeNameContainer}>
        <Text style={[styles.text, styles.animeName]}>{name}</Text>
        <Pressable
          onPress={() => {
            onChangeWishlist();
          }}
        >
          <Ionicons
            name={isInWishlist ? "bookmark" : "bookmark-outline"}
            size={29}
            color="#46d1ed"
          />
        </Pressable>
      </View>
      <Text style={[styles.text, styles.category]}>{category}</Text>
      <View style={styles.animeDetail}>
        <View style={[styles.detailContainer]}>
          <Text style={[styles.text, styles.detailHeader]}>Rating</Text>
          <Text style={[styles.text, styles.detail]}>{rating}</Text>
        </View>
        <Text style={[styles.text, styles.line]}>|</Text>
        <View style={[styles.detailContainer]}>
          <Text style={[styles.text, styles.detailHeader]}>Studio</Text>
          <Text style={[styles.text, styles.detail]}>{studio}</Text>
        </View>
        <Text style={[styles.text, styles.line]}>|</Text>
        <View style={[styles.detailContainer]}>
          <Text style={[styles.text, styles.detailHeader]}>Total Eps</Text>
          <Text style={[styles.text, styles.detail]}>{noOfEpisodes}</Text>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View>
        <Text style={[styles.text, styles.synopsisTitle]}>Synopsis</Text>
        <Text
          style={[styles.text, styles.synopsisText]}
          {...(!isExpand && { numberOfLines: 3 })}
        >
          {description}
        </Text>
        <Pressable
          style={styles.readMoreContainer}
          onPress={() => {
            setIsExpand(!isExpand);
          }}
        >
          <Text style={[styles.text, styles.readMore]}>
            Read {isExpand ? "less" : "more"}
          </Text>
          <Entypo
            name={isExpand ? "chevron-small-up" : "chevron-small-down"}
            size={30}
            color="#a9a1a1"
          />
        </Pressable>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.seasonContainer}>
        <Text style={styles.synopsisTitle}>Seasons</Text>
        <ScrollView horizontal style={{ marginLeft: 10, marginBottom: 10 }}>
          {SeasonComponents(noOfSeason)}
        </ScrollView>
      </View>
      <View style={styles.horizontalLine} />
    </View>
  );
};

export default AnimeDetail;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  text: {
    color: "white",
    fontFamily: "sfPro",
  },
  animeNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  animeName: {
    fontSize: 17,
    fontFamily: "sfProMed",
  },
  category: {
    color: "#a9a1a1",
    fontSize: 14,
    paddingLeft: 10,
  },
  animeDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  detailContainer: {
    alignItems: "center",
  },
  detailHeader: {
    fontSize: 15,
    color: "#46d1ed",
  },
  detail: {
    fontSize: 13,
    color: "#a9a1a1",
  },
  line: {
    fontSize: 40,
    color: "#206982",
  },
  horizontalLine: {
    borderBottomColor: "rgba(115, 117, 118,0.5)",
    borderBottomWidth: 1.5,
    paddingTop: 10,
    marginHorizontal: 25,
  },
  synopsisTitle: {
    marginTop: 10,
    marginHorizontal: 10,
    fontSize: 15.5,
    color: "#46d1ed",
    fontWeight: "700",
  },
  synopsisText: {
    marginTop: 5,
    marginHorizontal: 10,
    fontSize: 15,
    lineHeight: 18,
    color: "#a9a1a1",
  },
  readMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  readMore: {
    color: "#a9a1a1",
    fontSize: 15,
  },
  seasonTextContainer: {
    backgroundColor: "#4b4b4b",

    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  seasonContainer: {},
  seasonText: {
    fontSize: 12,
    color: "#bbb5b5",

    fontWeight: "700",
  },
});
