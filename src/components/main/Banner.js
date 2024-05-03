import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { ImageSlider } from "@pembajak/react-native-image-slider-banner";

const Banner = (props) => {
  const { allBannerImages } = props || {};
  // const allBannerImages = useSelector((state) => state.banner.bannerImages);

  return (
    <View>
      <ImageSlider
        data={allBannerImages}
        localImg={false}
        autoPlay={true}
        caroselImageStyle={{ height: 155 }}
        caroselImageContainerStyle={{ height: "auto" }}
        activeIndicatorStyle={styles.activeIndicatorStyle}
        inActiveIndicatorStyle={styles.inActiveIndicatorStyle}
        preview={false}
        indicatorMainContainerStyle={{ bottom: 0 }}
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  activeIndicatorStyle: {
    backgroundColor: "#249d9d",
    height: 9,
    width: 9,
  },
  inActiveIndicatorStyle: {
    height: 7,
    width: 7,
  },
});
