import { View, FlatList, BackHandler } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/main/Header";
import Banner from "../components/main/Banner";
import AnimeHorizontalList from "../components/main/AnimeHorizontalList";
import { container } from "../styles/styles";
import { getBanner, getMainScreenContent } from "../util/Main";
import Loading from "../components/common/Loading";
import { initializeBannerImages } from "../redux/banner";
import { initializeAnimeContent } from "../redux/allAnimeContent";

const Main = () => {
  const [AnimeCoverData, setAnimeCoverData] = useState([]);
  const [bannerImageData, setBannerImageData] = useState([]);
  const [APICallFinish, setAPICallFinish] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchInputData, setSearchInputData] = useState("");
  const categorizedAnimeDetail = useSelector(
    (state) => state.allAnimeContent.animeContent
  );

  const dispatch = useDispatch();

  const searchBarHandler = () => {
    changeSearchInputData("");
    setIsSearchVisible(!isSearchVisible);
  };

  const changeSearchInputData = (inp) => {
    setSearchInputData(inp);
    let animeFilterByCategory = [];
    categorizedAnimeDetail.forEach((animes) => {
      let animeList = [];
      animes.animeList.forEach((animeData) => {
        if (
          animeData.animeName.toUpperCase().indexOf(inp.toUpperCase()) !== -1
        ) {
          animeList.push(animeData);
        }
      });
      if (animeList.length > 0) {
        animeFilterByCategory.push({
          animeList: animeList,
          category: animes.category,
          id: animes.id,
        });
      }
    });
    setAnimeCoverData(animeFilterByCategory);
  };

  useEffect(() => {
    const callMainScreenContent = async () => {
      const getBannerImages = await getBanner();
      const mainScreenContent = await getMainScreenContent();
      setAnimeCoverData(mainScreenContent);
      setBannerImageData([...getBannerImages]);
      dispatch(initializeBannerImages({ bannerImages: getBannerImages }));
      dispatch(initializeAnimeContent({ allAnimeContent: mainScreenContent }));

      setAPICallFinish(true);
    };
    callMainScreenContent();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        BackHandler.exitApp();
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  return (
    <>
      {APICallFinish ? (
        <View style={container}>
          <Header
            onSearchBarHandler={searchBarHandler}
            isSearchVisible={isSearchVisible}
            searchInputData={searchInputData}
            onChangeInputData={changeSearchInputData}
          />
          <FlatList
            data={AnimeCoverData}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              !isSearchVisible && <Banner allBannerImages={bannerImageData} />
            }
            renderItem={({ item }) => (
              <AnimeHorizontalList
                animeCategory={item.category}
                animeList={item.animeList}
                isSearchVisible={isSearchVisible}
              />
            )}
          />
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Main;
