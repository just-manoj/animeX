import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DOMAIN, PORT } from "./Domain";

const MAIN_ROUTE = "auth";

export const SignUpCall = async (signUpData) => {
  const responses = (
    await axios({
      method: "post",
      url: `http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/signup`,
      data: JSON.stringify(signUpData),
      headers: { "Content-Type": "application/json" },
    })
  ).data;
  try {
    await AsyncStorage.setItem("Auth-Token", responses.token);
    return responses;
  } catch (error) {
    console.log(error);
  }
};

export const LogInCall = async (logInData) => {
  const responses = (
    await axios({
      method: "post",
      url: `http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/login`,
      data: logInData,
    })
  ).data;

  try {
    await AsyncStorage.setItem("Auth-Token", responses.token);
    return responses;
  } catch (error) {
    console.log(error);
    return { status: "failed" };
  }
};

export const isAuthenticated = async () => {
  let authToken;
  try {
    authToken = await AsyncStorage.getItem("Auth-Token");
  } catch (error) {
    return console.log("There is No Token Here..", error);
  }
  try {
    const responses = (
      await axios({
        method: "get",
        url: `http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/isAuth?checkIsAuth=true`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      })
    ).data;
    console.log(responses);
    return responses;
  } catch (error) {
    return { message: "Not Authtendicated..!" };
  }
};

export const logoutCall = async () => {
  try {
    await AsyncStorage.removeItem("Auth-Token");
    return { status: "success", message: "Token removed successfully" };
  } catch (error) {
    console.log("Logout Error", error);
    return { status: "failed", message: "Can't removed token" };
  }
};
