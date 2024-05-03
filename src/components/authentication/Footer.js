import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const Footer = (props) => {
  const { changeLogInMode, account, changeMode } = props;
  return (
    <View style={styles.signUpContainer}>
      <Text style={styles.haveAccount}>{account}</Text>
      <Pressable onPress={() => changeLogInMode(changeMode)}>
        <Text style={styles.signUp}>{changeMode}</Text>
      </Pressable>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  haveAccount: {
    color: "#bbb0b0",
    fontSize: 14,
  },
  signUp: {
    color: "#00fffb",
    fontSize: 16,
    fontWeight: "700",
  },
});
