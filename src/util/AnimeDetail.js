import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DOMAIN, MAIN_ROUTE, PORT } from "./Domain";

export const getAnimeData = async (category, animeName) => {
  let authToken;
  try {
    authToken = await AsyncStorage.getItem("Auth-Token");
    try {
      const responses = (
        await axios.get(
          `http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/category/${category}/${animeName}`,
          {
            headers: {
              Authorization: "Bearer " + authToken,
            },
          }
        )
      ).data;

      return responses;
    } catch (error) {
      return { message: "Not Authtendicated..!" };
    }
  } catch (error) {
    return console.log("There is No Token Here..", error);
  }
};

export const postAnimeToWishlist = async (animeId) => {
  let authToken;
  try {
    authToken = await AsyncStorage.getItem("Auth-Token");
  } catch (error) {
    console.log("There is No Token Here..", error);
    return { status: "failed", message: "There is No Token Here" };
  }

  try {
    const responses = (
      await axios.put(
        `http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/user/WishList`,
        {
          animeId: animeId,
        },
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      )
    ).data;

    return responses;
  } catch (error) {
    return { message: "Not Authtendicated..!" };
  }
};
