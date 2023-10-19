import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

const InputText = (props) => {
  return (
    <>
      <TextInput
        {...props}
        style={styles.inputText}
        placeholderTextColor="#a8a1a1"
      />
    </>
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputText: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    color: "#ffffff",
    fontSize: 15,
    fontFamily: "sfPro",
  },
});
