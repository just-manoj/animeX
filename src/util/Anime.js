import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DOMAIN, MAIN_ROUTE, PORT } from "./Domain";

export const getNoOfSeasons = async (category, animeName) => {
  let authToken;
  try {
    authToken = await AsyncStorage.getItem("Auth-Token");
  } catch (error) {
    return console.log("There is No Token Here..", error);
  }

  try {
    const responses = (
      await axios.get(
        `http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/category/${category}/${animeName}/seasons`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      )
    ).data;

    return responses;
  } catch (error) {
    // console.log(error);
    return { message: "Not Authtendicated..!" };
  }
};

export const getAnimeEpisodes = async (category, animeName, season) => {
  let authToken;
  try {
    authToken = await AsyncStorage.getItem("Auth-Token");
  } catch (error) {
    return console.log("There is No Token Here..", error);
  }

  const responses = (
    await axios.get(
      `http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/category/${category}/${animeName}/episodes?season=${season}`,
      {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      }
    )
  ).data;

  return responses;
};
