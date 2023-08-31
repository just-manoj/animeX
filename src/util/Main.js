import axios from "axios";

export const getBanner = async () => {
  const responses = (
    await axios.get("http://192.168.154.217:27940/content/banner")
  ).data.images;

  const bannerImages = responses.map((url) => {
    return { img: { uri: "http://192.168.154.217:27940" + url } };
  });
  return bannerImages;
};
