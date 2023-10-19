import { configureStore } from "@reduxjs/toolkit";

import banner from "./banner";
import allAnimeContentSlice from "./allAnimeContent";

export const store = configureStore({
  reducer: {
    banner: banner,
    allAnimeContent: allAnimeContentSlice,
  },
});
