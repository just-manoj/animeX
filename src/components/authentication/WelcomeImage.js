import { StyleSheet, Image, View } from "react-native";
import React from "react";

const WelcomeImage = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("../../../assets/banners/welcome.jpg")}
        style={styles.bannerImage}
      />
    </View>
  );
};

export default WelcomeImage;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  bannerImage: {
    width: "80%",
    height: 100,
    resizeMode: "contain",
  },
});
