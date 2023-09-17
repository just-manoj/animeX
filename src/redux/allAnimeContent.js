import { createSlice } from "@reduxjs/toolkit";

const allAnimeContentSlice = createSlice({
  name: "allAnimeContent",
  initialState: {
    animeContent: [],
  },
  reducers: {
    initializeAnimeContent: (state, action) => {
      action.payload.allAnimeContent.forEach((animeContent) => {
        state.animeContent.push(animeContent);
      });
    },
    filterByCategory: (state, action) => {
      const animeFilterByCategory = state.animeContent.filter(
        (anime) => anime.category !== action.payload.animeCatogery
      );

      return {
        ...state,
        animeContent: animeFilterByCategory,
      };
    },
  },
});

export const initializeAnimeContent =
  allAnimeContentSlice.actions.initializeAnimeContent;
export const filterByCategory = allAnimeContentSlice.actions.filterByCategory;

export default allAnimeContentSlice.reducer;
