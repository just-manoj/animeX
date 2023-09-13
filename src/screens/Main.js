import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";

import Header from "../components/main/Header";
import Banner from "../components/main/Banner";
import AnimeHorizontalList from "../components/main/AnimeHorizontalList";
import { container } from "../styles/styles";
import { getBanner, getMainScreenContent } from "../util/Main";
import Loading from "../components/common/Loading";

const Main = () => {
  const [bannerImages, setbannerImages] = useState([]);
  const [AnimeCoverData, setAnimeCoverData] = useState([]);
  const [APICallFinish, setAPICallFinish] = useState(false);

  useEffect(() => {
    const callMainScreenContent = async () => {
      const getBannerImages = await getBanner();
      const mainScreenContent = await getMainScreenContent();
      setbannerImages(getBannerImages);
      setAnimeCoverData(mainScreenContent);
      setAPICallFinish(true);
    };
    callMainScreenContent();
  }, []);
  return (
    <>
      {APICallFinish ? (
        <View style={container}>
          <Header />
          <FlatList
            data={AnimeCoverData}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<Banner bannerImages={bannerImages} />}
            renderItem={({ item }) => (
              <AnimeHorizontalList
                animeCategory={item.category}
                animeList={item.list}
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
