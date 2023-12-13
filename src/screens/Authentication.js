import { StyleSheet, View, Image } from "react-native";
import React, { useState, useEffect } from "react";

import { container } from "../styles/styles";
import LogIn from "../components/authentication/LogIn";
import SignUp from "../components/authentication/SignUp";
import { SignUpCall, LogInCall, isAuthenticated } from "../util/Auth";
import Loading from "../components/common/Loading";

const Authentication = ({ navigation }) => {
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
  const [isLogIn, setIsLogIn] = useState(true);
  const [isAuth, setIsAuth] = useState(true);

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
    navigationHandler();
  };

  const logInHandler = async () => {
    await LogInCall(logInInputData);
    navigationHandler();
  };

  const navigationHandler = () => {
    navigation.navigate("main");
  };

  useEffect(() => {
    const authHandler = async () => {
      const status = await isAuthenticated();

      if (status.message == "Authtendicated...!") {
        navigationHandler();
      } else {
        setIsAuth(false);
      }
    };

    authHandler();
  }, [isAuthenticated]);

  return (
    <>
      {isAuth ? (
        <Loading />
      ) : (
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
      )}
    </>
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
