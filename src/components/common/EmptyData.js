import { StyleSheet, Text, View } from "react-native";
import React from "react";

const EmptyData = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.warning}>{children}</Text>
    </View>
  );
};

export default EmptyData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  warning: {
    fontSize: 20,
    fontFamily: "lucidaGrandeBold",
    color: "#ffffff",
  },
});
