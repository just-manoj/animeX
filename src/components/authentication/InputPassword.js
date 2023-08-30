import { StyleSheet, View, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

import InputText from "../common/InputText";

const InputPassword = (props) => {
  const { inputContainerStyle, inputProps, hidePassword, isPasswordHide } =
    props || {};
  return (
    <View style={[styles.passwordContainer, inputContainerStyle]}>
      <InputText {...inputProps} />
      <Pressable onPress={hidePassword}>
        <Entypo
          name={isPasswordHide ? "eye-with-line" : "eye"}
          size={24}
          color="#ffffff"
        />
      </Pressable>
    </View>
  );
};

export default InputPassword;

const styles = StyleSheet.create({
  passwordContainer: {
    paddingRight: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "green",
  },
});
