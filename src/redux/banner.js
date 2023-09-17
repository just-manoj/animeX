import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    bannerImages: [],
  },
  reducers: {
    initializeBannerImages: (state, action) => {
      action.payload.bannerImages.forEach((bannerImage) => {
        state.bannerImages.push(bannerImage);
      });
    },
  },
});

export const initializeBannerImages =
  bannerSlice.actions.initializeBannerImages;
export default bannerSlice.reducer;
