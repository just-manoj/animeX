import { StyleSheet, View, Image, Alert, BackHandler } from "react-native";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { container } from "../styles/styles";
import LogIn from "../components/authentication/LogIn";
import SignUp from "../components/authentication/SignUp";
import { SignUpCall, LogInCall, isAuthenticated } from "../util/Auth";
import Loading from "../components/common/Loading";

const Authentication = ({ navigation, route }) => {
  const { againLogin } = route.params || {};

  const defaultLogInData = {
    email: "",
    password: "",
  };

  const defaultSignInData = {
    name: "",
    email: "",
    birthDayDate: "",
    password: "",
    repeatPassword: "",
  };

  const [logInInputData, setlogInInputData] = useState({ ...defaultLogInData });
  const [signUpInputData, setSignUpInputData] = useState({
    ...defaultSignInData,
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
    emptyInputData();
    setIsLogIn(!isLogIn);
  };

  const emptyInputData = () => {
    setlogInInputData({
      ...defaultLogInData,
    });

    setSignUpInputData({
      ...defaultSignInData,
    });
  };

  const signupHandler = async () => {
    const res = await SignUpCall(signUpInputData);
    if (res.status === "success") {
      navigationHandler();
    } else {
      Alert.alert("Error", "Wrong Credential");
    }
  };

  const logInHandler = async () => {
    if (logInInputData.email !== "" && logInInputData.password !== "") {
      const res = await LogInCall(logInInputData);

      if (res.status === "success") {
        setlogInInputData;
        navigationHandler();
      } else {
        Alert.alert("Error", "Wrong Credential");
      }
    }
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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        BackHandler.exitApp();
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      emptyInputData();
      if (againLogin) {
        setIsAuth(false);
        setIsLogIn(true);
      }
      return () => {};
    }, [againLogin])
  );

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
