import axios from "axios";

import { DOMAIN, PORT } from "./Domain";

const MAIN_ROUTE = "auth";

export const SignUpCall = async (signUpData) => {
  const responses = (
    await axios({
      method: "post",
      url: `http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/signup`,
      data: signUpData,
    })
  ).data;

  console.log(responses);
};

export const LogInCall = async (logInData) => {
  const responses = (
    await axios({
      method: "post",
      url: `http://${DOMAIN}:${PORT}/${MAIN_ROUTE}/login`,
      data: logInData,
    })
  ).data;

  console.log(responses);
};
