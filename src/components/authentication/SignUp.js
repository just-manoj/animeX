import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";

import InputText from "../common/InputText";
import FullButton from "../common/FullButton";
import InputPassword from "./InputPassword";
import Footer from "./Footer";

const SignUp = (props) => {
  const { signUpInput, changeInputValue, changeLogInMode } = props || {};

  const emptyFocus = {
    name: false,
    email: false,
    password: false,
    repeatPassword: false,
  };
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [isRepeatPasswordHide, setIsRepeatPasswordHide] = useState(true);
  const [isFocus, setIsFocus] = useState(emptyFocus);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.secondaryContainer}>
        <View style={[styles.bannerOverlay, styles.bannerImage]} />
        <Text style={styles.title}>SignUp</Text>
        <View
          style={[
            styles.inputContainer,
            isFocus.email && styles.inputTextBorder,
          ]}
        >
          <InputText
            value={signUpInput.name}
            onChangeText={(inp) => changeInputValue("name", inp)}
            onFocus={() =>
              setIsFocus({
                ...emptyFocus,
                name: true,
              })
            }
            onBlur={() => setIsFocus(emptyFocus)}
            placeholder="Name"
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            isFocus.email && styles.inputTextBorder,
          ]}
        >
          <InputText
            value={signUpInput.email}
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
            value: signUpInput.password,
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

        <InputPassword
          inputContainerStyle={[
            styles.inputContainer,
            isFocus.password && styles.inputTextBorder,
          ]}
          inputProps={{
            value: signUpInput.repeatPassword,
            onChangeText: (inp) => changeInputValue("repeatPassword", inp),
            autoFocus: isFocus.repeatPassword,
            onFocus: () =>
              setIsFocus({
                ...isFocus,
                repeatPassword: true,
              }),
            onBlur: () =>
              setIsFocus({
                name: false,
                email: false,
                password: false,
                repeatPassword: false,
              }),
            placeholder: "Repeat Password",
            secureTextEntry: isRepeatPasswordHide,
            multiline: false,
          }}
          hidePassword={() => setIsRepeatPasswordHide(!isRepeatPasswordHide)}
          isPasswordHide={isRepeatPasswordHide}
        />
        <FullButton>SignUp</FullButton>
      </View>
      <Footer
        changeLogInMode={changeLogInMode}
        changeMode="LogIn"
        account="Already have an account? "
      />
    </KeyboardAvoidingView>
  );
};

export default SignUp;

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
});
