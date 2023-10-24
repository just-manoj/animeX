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
  },
});

export const initializeAnimeContent =
  allAnimeContentSlice.actions.initializeAnimeContent;

export default allAnimeContentSlice.reducer;
