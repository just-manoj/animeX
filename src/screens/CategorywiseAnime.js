import { View, FlatList, StyleSheet, BackHandler } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AnimeCoverImage from "../components/common/AnimeCoverImage";
import CategorywiseHeader from "../components/common/CategorywiseHeader";
import { container } from "../styles/styles";

const CategorywiseAnime = ({ route, navigation }) => {
  const { category } = route.params;
  const [initialAnimeList, setInitialAnimeList] = useState({});
  const [animeList, setAnimeList] = useState([]);
  const [searchInputData, setSearchInputData] = useState("");

  const categorizedAnimeDetail = useSelector(
    (state) => state.allAnimeContent.animeContent
  );

  useEffect(() => {
    const animeFilterByCategory = categorizedAnimeDetail.filter(
      (anime) => anime.category === category
    );

    setAnimeList(animeFilterByCategory[0].animeList);

    setInitialAnimeList(animeFilterByCategory[0]);
  }, [categorizedAnimeDetail]);

  const changeSearchInputData = (inp) => {
    setSearchInputData(inp);
    setAnimeList(
      initialAnimeList.animeList.filter((anime) => {
        return anime.animeName.toUpperCase().indexOf(inp.toUpperCase()) !== -1;
      })
    );
  };

  const clearSearchInputData = () => {
    setSearchInputData("");
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={container}>
      <CategorywiseHeader
        animeCategory={category}
        searchInputData={searchInputData}
        changeSearchInputData={changeSearchInputData}
        clearSearchInputData={clearSearchInputData}
        setSearchInputData={setSearchInputData}
      />
      <FlatList
        data={animeList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnimeCoverImage
            coverUrl={item.coverImgUrl}
            animeName={item.animeName}
            VerticalStyle={{ marginBottom: 20, width: 130 }}
            animeCategory={category}
          />
        )}
        numColumns={3}
        style={styles.AnimeCoverList}
      />
    </View>
  );
};

export default CategorywiseAnime;

const styles = StyleSheet.create({
  AnimeCoverList: {
    marginTop: 10,
  },
});
