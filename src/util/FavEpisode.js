import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DOMAIN, MAIN_ROUTE, PORT } from "./Domain";

export const getFavEpisodelist = async () => {
  let authToken;
  try {
    authToken = await AsyncStorage.getItem("Auth-Token");
  } catch (error) {
    console.log("There is No Token Here..", error);
    return { status: "failed", message: "There is No Token Here" };
  }

  try {
    const responses = (
      await axios.get(`http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/user/FavList`, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
    ).data;
    return responses;
  } catch (error) {
    return { message: "Not Authtendicated..!" };
  }
};
