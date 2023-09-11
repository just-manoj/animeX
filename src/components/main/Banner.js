import { StyleSheet, View } from "react-native";
import { ImageSlider } from "@pembajak/react-native-image-slider-banner";

const Banner = (props) => {
  const { bannerImages } = props || {};
  return (
    <View>
      <ImageSlider
        data={bannerImages}
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

// data={[
//   { img: require("../../../assets/banners/DeathNoteBanner.png") },
//   { img: require("../../../assets/banners/ChainsawManBanner.png") },
//   { img: require("../../../assets/banners/BeyBladeBurstBanner.png") },
//   { img: require("../../../assets/banners/TokyoBanner.png") },
//   { img: require("../../../assets/banners/OnePunchManBanner.png") },
// ]}
