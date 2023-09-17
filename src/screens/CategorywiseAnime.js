import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AnimeCoverImage from "../components/common/AnimeCoverImage";
import CategorywiseHeader from "../components/common/CategorywiseHeader";
import { container } from "../styles/styles";
import { filterByCategory } from "../redux/allAnimeContent";

const CategorywiseAnime = ({ route }) => {
  const { category } = route.params;
  const [initialAnimeList, setInitialAnimeList] = useState({});
  const [animeList, setAnimeList] = useState([]);
  const [searchInputData, setSearchInputData] = useState("");

  const dispatch = useDispatch();

  const categorizedAnimeDetail = useSelector(
    (state) => state.allAnimeContent.animeContent
  );

  useEffect(() => {
    dispatch(filterByCategory({ animeCatogery: category }));

    setAnimeList(categorizedAnimeDetail[0].list);
    setInitialAnimeList(categorizedAnimeDetail[0]);
  }, []);

  const changeSearchInputData = (inp) => {
    setSearchInputData(inp);
    setAnimeList(
      initialAnimeList.list.filter((anime) => {
        return anime.animeName.toUpperCase().indexOf(inp.toUpperCase()) !== -1;
      })
    );
  };

  const clearSearchInputData = () => {
    setSearchInputData("");
  };

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
