import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { DOMAIN, PORT } from "../../util/Domain";

const Header = (props) => {
  const { playPromoHandler, promoUrl, posterUrl } = props || {};
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: posterUrl,
        }}
        style={styles.poster}
      />
      <View style={styles.iconContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={35}
          color="#ffffff"
          onPress={() => {
            navigation.goBack();
          }}
        />
        {/* <Entypo name="dots-three-vertical" size={29} color="#ffffff" /> */}
      </View>
      <View style={styles.playContainer}>
        <TouchableOpacity onPress={playPromoHandler}>
          <AntDesign
            name="playcircleo"
            size={60}
            color="#46d1ed"
            style={{
              backgroundColor: "rgba(130, 127, 127, 0.6)",
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.playText}>Watch Trailer</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  iconContainer: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  poster: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  playContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  playText: {
    fontFamily: "sfPro",
    fontSize: 17.5,
    color: "white",
  },
});
