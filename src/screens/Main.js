import { View, FlatList, BackHandler } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
  const [APICallFinish, setAPICallFinish] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const callMainScreenContent = async () => {
      const getBannerImages = await getBanner();
      const mainScreenContent = await getMainScreenContent();
      setAnimeCoverData(mainScreenContent);

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
          <Header />
          <FlatList
            data={AnimeCoverData}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<Banner />}
            renderItem={({ item }) => (
              <AnimeHorizontalList
                animeCategory={item.category}
                animeList={item.animeList}
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
