import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const FullButton = (props) => {
  const { onPress, children } = props || {};
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default FullButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 40,
    width: "85%",
    padding: 10,
    backgroundColor: "#00fffb",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "#ff00e1",
    fontSize: 20,
    fontFamily: "lucidaGrandeBold",
  },
});
