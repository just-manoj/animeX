import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";

import InputText from "../common/InputText";
import FullButton from "../common/FullButton";
import InputPassword from "./InputPassword";
import Footer from "./Footer";

const LogIn = (props) => {
  const { logInInput, changeInputValue, changeLogInMode, onPress } =
    props || {};

  const emptyFocus = {
    email: false,
    password: false,
  };

  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [isFocus, setIsFocus] = useState(emptyFocus);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.secondaryContainer}>
        <View style={[styles.bannerOverlay, styles.bannerImage]} />
        <Text style={styles.title}>LogIn</Text>
        <View
          style={[
            styles.inputContainer,
            isFocus.email && styles.inputTextBorder,
          ]}
        >
          <InputText
            value={logInInput.email}
            keyboardType="email-address"
            onChangeText={(inp) => changeInputValue("email", inp)}
            onFocus={() =>
              setIsFocus({
                ...emptyFocus,
                email: true,
              })
            }
            onBlur={() => setIsFocus(emptyFocus)}
            placeholder="E-Mail Address"
          />
        </View>
        <InputPassword
          inputContainerStyle={[
            styles.inputContainer,
            isFocus.password && styles.inputTextBorder,
          ]}
          inputProps={{
            value: logInInput.password,
            onChangeText: (inp) => changeInputValue("password", inp),
            autoFocus: isFocus.password,
            onFocus: () =>
              setIsFocus({
                ...emptyFocus,
                password: true,
              }),
            onBlur: () => setIsFocus(emptyFocus),
            placeholder: "Password",
            secureTextEntry: isPasswordHide,
            multiline: false,
          }}
          hidePassword={() => setIsPasswordHide(!isPasswordHide)}
          isPasswordHide={isPasswordHide}
        />
        <FullButton onPress={onPress}>LogIn</FullButton>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>
      <Footer
        changeLogInMode={changeLogInMode}
        changeMode="SignUp"
        account="Don't have an account? "
      />
    </KeyboardAvoidingView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  bannerOverlay: {
    position: "absolute",
  },
  secondaryContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  title: {
    marginTop: 50,
    fontSize: 25,
    color: "#59e0e0",
    fontFamily: "cilokThere",
  },
  inputTextBorder: {
    borderColor: "#42d1e7",
    borderTopWidth: 3.5,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 1.25,
  },
  inputContainer: {
    marginTop: 20,
    width: "85%",
    backgroundColor: "#171717",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#ffffff",
  },
  passwordContainer: {
    paddingRight: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  forgotPassword: {
    marginTop: 13,
    color: "#00fffb",
    fontSize: 14.5,
    fontWeight: "600",
  },
});
