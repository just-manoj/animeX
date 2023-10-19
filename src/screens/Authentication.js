import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";

import { container } from "../styles/styles";
import LogIn from "../components/authentication/LogIn";
import SignUp from "../components/authentication/SignUp";
import { SignUpCall, LogInCall } from "../util/Auth";

const Authentication = () => {
  const [logInInputData, setlogInInputData] = useState({
    email: "",
    password: "",
  });

  const [signUpInputData, setSignUpInputData] = useState({
    name: "",
    email: "",
    birthDayDate: "",
    password: "",
    repeatPassword: "",
  });
  const [isLogIn, setIsLogIn] = useState(false);

  const updateLogInInputValues = (key, value) => {
    setlogInInputData((existingInputValues) => {
      return {
        ...existingInputValues,
        [key]: value,
      };
    });
  };

  const updateSignUpInputValues = (key, value) => {
    setSignUpInputData((existingInputValues) => {
      return {
        ...existingInputValues,
        [key]: value,
      };
    });
  };

  const changeLogInMode = () => {
    setlogInInputData({
      email: "",
      password: "",
    });

    setSignUpInputData({
      name: "",
      email: "",
      birthDayDate: "",
      password: "",
      repeatPassword: "",
    });

    setIsLogIn(!isLogIn);
  };

  const signupHandler = async () => {
    await SignUpCall(signUpInputData);
  };

  const logInHandler = async () => {
    await LogInCall(logInInputData);
  };
  return (
    <View style={container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/banners/welcome.jpg")}
          style={styles.bannerImage}
        />
      </View>
      {isLogIn ? (
        <LogIn
          logInInput={logInInputData}
          changeInputValue={updateLogInInputValues}
          changeLogInMode={changeLogInMode}
          onPress={logInHandler}
        />
      ) : (
        <SignUp
          signUpInput={signUpInputData}
          changeInputValue={updateSignUpInputValues}
          changeLogInMode={changeLogInMode}
          onPress={signupHandler}
        />
      )}
    </View>
  );
};

export default Authentication;

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
