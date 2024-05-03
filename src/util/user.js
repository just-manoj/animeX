import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DOMAIN, PORT } from "./Domain";

export const getUserProfile = async () => {
  let authToken;

  try {
    authToken = await AsyncStorage.getItem("Auth-Token");
  } catch (error) {
    return console.log("There is No Token Here..", error);
  }
  try {
    const responses = (
      await axios.get(`http://${DOMAIN}:${PORT}/user/getProfile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      })
    ).data;
    return responses;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (password) => {
  let authToken;

  try {
    authToken = await AsyncStorage.getItem("Auth-Token");
  } catch (error) {
    return console.log("There is No Token Here..", error);
  }
  try {
    const responses = (
      await axios.put(
        `http://${DOMAIN}:${PORT}/user/changePassword`,
        {
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
    ).data;
    return responses;
  } catch (error) {
    console.log(error);
  }
};

export const getOTP = async () => {
  let authToken;

  try {
    authToken = await AsyncStorage.getItem("Auth-Token");
  } catch (error) {
    return console.log("There is No Token Here..", error);
  }
  try {
    const responses = (
      await axios.get(`http://${DOMAIN}:${PORT}/auth/mailVerify`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      })
    ).data;
    return responses;
  } catch (error) {
    console.log(error);
  }
};

export const verifyOTP = async (otp) => {
  let authToken;

  try {
    authToken = await AsyncStorage.getItem("Auth-Token");
  } catch (error) {
    return console.log("There is No Token Here..", error);
  }
  try {
    const responses = (
      await axios.post(
        `http://${DOMAIN}:${PORT}/auth/mailVerify`,
        {
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
        }
      )
    ).data;
    return responses;
  } catch (error) {
    console.log(error);
  }
};
