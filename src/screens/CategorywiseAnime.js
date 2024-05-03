import { View, FlatList, StyleSheet, BackHandler, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AnimeCoverImage from "../components/common/AnimeCoverImage";
import CategorywiseHeader from "../components/common/CategorywiseHeader";
import { container } from "../styles/styles";
import EmptyData from "../components/common/EmptyData";
import { postAnimeToWishlist } from "../util/AnimeDetail";

const CategorywiseAnime = ({ route, navigation }) => {
  const { category, isWishList, animeIds } = route.params || {};
  const [initialAnimeList, setInitialAnimeList] = useState({});
  const [animeList, setAnimeList] = useState([]);
  const [searchInputData, setSearchInputData] = useState("");

  const categorizedAnimeDetail = useSelector(
    (state) => state.allAnimeContent.animeContent
  );

  useEffect(() => {
    let animeFilterByCategory = [];
    if (isWishList) {
      categorizedAnimeDetail.forEach((animes) => {
        animes.animeList.forEach((animeData) => {
          if (animeIds.includes(animeData.id)) {
            animeFilterByCategory.push({
              ...animeData,
              category: animes.category,
            });
          }
        });
      });
      setAnimeList(animeFilterByCategory);
      setInitialAnimeList(animeFilterByCategory);
    } else {
      animeFilterByCategory = categorizedAnimeDetail.filter(
        (anime) => anime.category === category
      );

      setAnimeList(animeFilterByCategory[0].animeList);
      setInitialAnimeList(animeFilterByCategory[0].animeList);
    }
  }, [categorizedAnimeDetail]);

  const changeSearchInputData = (inp) => {
    setSearchInputData(inp);
    setAnimeList(
      initialAnimeList.filter((anime) => {
        return anime.animeName.toUpperCase().indexOf(inp.toUpperCase()) !== -1;
      })
    );
  };

  const clearSearchInputData = () => {
    setSearchInputData("");
  };

  const wishlistHandler = async (animeId) => {
    const res = await postAnimeToWishlist(animeId);
    if (res.status === "success") {
      setAnimeList(
        animeList.filter((preAnimeData) => {
          return preAnimeData.id !== animeId;
        })
      );
      setInitialAnimeList(
        initialAnimeList.filter((preAnimeData) => {
          return preAnimeData.id !== animeId;
        })
      );
    }
  };

  const onLongPressAnimeHanlder = (animeId, animeName) => {
    Alert.alert(
      "Wishlist Remove Conformation",
      "Do you want to remove " + animeName + " anime?",
      [
        {
          text: "Yes",
          onPress: () => wishlistHandler(animeId),
        },
        { text: "No", onPress: () => {} },
      ]
    );
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
        animeCategory={isWishList ? "WishList" : category}
        searchInputData={searchInputData}
        changeSearchInputData={changeSearchInputData}
        clearSearchInputData={clearSearchInputData}
        setSearchInputData={setSearchInputData}
        isWishList={isWishList}
      />
      {animeList.length > 0 ? (
        <FlatList
          data={animeList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AnimeCoverImage
              animeId={item.id}
              coverUrl={item.coverImgUrl}
              animeName={item.animeName}
              VerticalStyle={{ marginBottom: 20, width: 130 }}
              animeCategory={isWishList ? item.category : category}
              isWishList={isWishList}
              onWishlistHandler={onLongPressAnimeHanlder}
            />
          )}
          numColumns={3}
          style={styles.AnimeCoverList}
        />
      ) : (
        <EmptyData>No Wishlist Animes</EmptyData>
      )}
    </View>
  );
};

export default CategorywiseAnime;

const styles = StyleSheet.create({
  AnimeCoverList: {
    marginTop: 10,
  },
});
