import axios from "axios";

import { DOMAIN, MAIN_ROUTE, PORT } from "./Domain";

export const getNoOfSeasons = async (category, animeName) => {
  const responses = (
    await axios.get(
      `http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/category/${category}/${animeName}/seasons`
    )
  ).data;

  return responses;
};

export const getAnimeEpisodes = async (category, animeName) => {
  const responses = (
    await axios.get(
      `http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/category/${category}/${animeName}/episodes`
    )
  ).data;

  const AnimeEpisodesContent = {
    ...responses,
    episodesList: responses.animeEpisode.episodesList.map((anime) => {
      return {
        ...anime,
        episodeImageUrl: `http://${DOMAIN}:${PORT}` + anime.episodeImageUrl,
      };
    }),
  };

  return AnimeEpisodesContent;
};
