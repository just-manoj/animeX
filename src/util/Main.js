import axios from "axios";

import { DOMAIN, MAIN_ROUTE, PORT } from "./Domain";

export const getBanner = async () => {
  const responses = (
    await axios.get(`http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/banner`)
  ).data.images;

  const bannerImages = responses.map((url) => {
    // return { img: { uri: `http://${DOMAIN}:${PORT}` + url } };
    return { img: `http://${DOMAIN}:${PORT}` + url };
  });
  return bannerImages;
};

export const getMainScreenContent = async () => {
  const responses = (
    await axios.get(`http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/listAll`)
  ).data.animeContent;

  const mainScreenContent = responses.map((content) => {
    return {
      ...content,
      list: content.list.map((anime) => {
        return {
          ...anime,
          coverImgUrl: `http://${DOMAIN}:${PORT}` + anime.coverImgUrl,
        };
      }),
    };
  });

  return mainScreenContent;
};
