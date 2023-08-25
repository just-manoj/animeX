import { StyleSheet, Text, View } from "react-native";
import { ImageSlider } from "@pembajak/react-native-image-slider-banner";

const Banner = () => {
  return (
    <View>
      <ImageSlider
        data={[
          { img: require("../../../assets/banners/DeathNoteBanner.png") },
          { img: require("../../../assets/banners/ChainsawManBanner.png") },
          { img: require("../../../assets/banners/BeyBladeBurstBanner.png") },
          { img: require("../../../assets/banners/TokyoBanner.png") },
          { img: require("../../../assets/banners/OnePunchManBanner.png") },
        ]}
        localImg
        autoPlay
        previewImageStyle={{ height: 100 }}
        caroselImageStyle={{ height: 125 }}
        caroselImageContainerStyle={{ height: 165 }}
        activeIndicatorStyle={{
          backgroundColor: "#249d9d",
          height: 9,
          width: 9,
        }}
        inActiveIndicatorStyle={{
          height: 7,
          width: 7,
        }}
        preview={false}
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({});
