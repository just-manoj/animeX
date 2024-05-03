import { StyleSheet, View, Image, Alert, BackHandler } from "react-native";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { container } from "../styles/styles";
import LogIn from "../components/authentication/LogIn";
import SignUp from "../components/authentication/SignUp";
import { SignUpCall, LogInCall, isAuthenticated } from "../util/Auth";
import Loading from "../components/common/Loading";
import WelcomeImage from "../components/authentication/WelcomeImage";
import OTPVerification from "../components/Profile/OTPVerification";
import ResetPassword from "../components/Profile/ResetPassword";

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
  const [screenName, setScreenName] = useState("LogIn");
  const [isAuth, setIsAuth] = useState(true);
  const [isbuttonPressed, setIsButtonPressed] = useState(false);

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

  const changeLogInMode = (screen) => {
    if (screen !== "OTP" && screen !== "ResetPassword") {
      emptyInputData();
    }
    if (screen === "OTP" && logInInputData.email === "") {
      return;
    }
    setIsButtonPressed(false);
    setScreenName(screen);
  };

  const emptyInputData = () => {
    setIsButtonPressed(false);
    setlogInInputData({
      ...defaultLogInData,
    });

    setSignUpInputData({
      ...defaultSignInData,
    });
  };

  const signupHandler = async () => {
    setIsButtonPressed(true);
    if (
      signUpInputData.email !== "" &&
      signUpInputData.password !== "" &&
      signUpInputData.birthDayDate !== "" &&
      signUpInputData.password !== "" &&
      signUpInputData.repeatPassword !== ""
    ) {
      const res = await SignUpCall(signUpInputData);
      if (res.status === "success") {
        navigationHandler();
      } else {
        Alert.alert("Error", "Wrong Credential");
      }
    } else {
      Alert.alert("Error", "Enter All Fields.!");
    }
  };

  const logInHandler = async () => {
    setIsButtonPressed(true);
    if (logInInputData.email !== "" && logInInputData.password !== "") {
      const res = await LogInCall(logInInputData);

      if (res.status === "success") {
        setlogInInputData;
        navigationHandler();
      } else {
        Alert.alert("Error", "Wrong Credential", [
          { text: "OK", onPress: () => emptyInputData() },
        ]);
      }
    } else {
      Alert.alert("Error", "Enter All Fields.!");
    }
  };

  const navigationHandler = () => {
    navigation.navigate("main");
    setIsButtonPressed(false);
    setScreenName("LogIn");
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
        setScreenName("LogIn");
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
          {screenName === "LogIn" ? (
            <>
              <WelcomeImage />
              <LogIn
                logInInput={logInInputData}
                changeInputValue={updateLogInInputValues}
                changeLogInMode={changeLogInMode}
                onPress={logInHandler}
                isbuttonPressed={isbuttonPressed}
              />
            </>
          ) : screenName === "SignUp" ? (
            <>
              <WelcomeImage />
              <SignUp
                signUpInput={signUpInputData}
                changeInputValue={updateSignUpInputValues}
                changeLogInMode={changeLogInMode}
                onPress={signupHandler}
                isbuttonPressed={isbuttonPressed}
              />
            </>
          ) : screenName === "OTP" ? (
            <OTPVerification
              purpose="reset-password"
              onChangeScreenHandler={changeLogInMode}
              email={logInInputData.email}
              changeLogInMode={changeLogInMode}
            />
          ) : screenName === "ResetPassword" ? (
            <ResetPassword
              purpose="reset-password"
              onChangeScreenHandler={changeLogInMode}
              email={logInInputData.email}
            />
          ) : null}
        </View>
      )}
    </>
  );
};

export default Authentication;
