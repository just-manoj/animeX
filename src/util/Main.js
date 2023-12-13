import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DOMAIN, MAIN_ROUTE, PORT } from "./Domain";

export const getBanner = async () => {
  let authToken;
  try {
    authToken = await AsyncStorage.getItem("Auth-Token");
  } catch (error) {
    return console.log("There is No Token Here..", error);
  }
  const responses = (
    await axios.get(`http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/banner`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    })
  ).data.images;

  return responses;
};

export const getMainScreenContent = async () => {
  let authToken;

  try {
    authToken = await AsyncStorage.getItem("Auth-Token");
  } catch (error) {
    return console.log("There is No Token Here..", error);
  }

  const responses = (
    await axios.get(`http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/listAll`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    })
  ).data.animeContent;

  return responses;
};
