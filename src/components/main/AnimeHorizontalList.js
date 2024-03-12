import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AnimeCoverImage from "../common/AnimeCoverImage";

const AnimeHorizontalList = (props) => {
  const { animeCategory, animeList } = props;
  const navigation = useNavigation();

  const goToCategoryScreen = () => {
    navigation.navigate("CategorywiseAnime", {
      category: animeCategory,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{animeCategory}</Text>
        <TouchableOpacity onPress={goToCategoryScreen}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={animeList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnimeCoverImage
            animeCategory={animeCategory}
            coverUrl={item.coverImgUrl}
            animeName={item.animeName}
            backScreenName="main"
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.AnimeCoverList}
      />
    </View>
  );
};

export default AnimeHorizontalList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 17,
    color: "#46d1ed",
    fontFamily: "cilokThere",
  },
  seeAll: {
    fontSize: 15,
    color: "#ffffff",
    fontFamily: "PoetsenOne",
  },
  AnimeCoverList: {
    marginTop: 7,
  },
});
