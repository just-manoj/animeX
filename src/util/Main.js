import axios from "axios";

import { DOMAIN, MAIN_ROUTE, PORT } from "./Domain";

export const getBanner = async () => {
  const responses = (
    await axios.get(`http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/banner`)
  ).data.images;

  return responses;
};

export const getMainScreenContent = async () => {
  const responses = (
    await axios.get(`http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/listAll`)
  ).data.animeContent;

  return responses;
};
