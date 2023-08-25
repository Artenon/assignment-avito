import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://free-to-play-games-database.p.rapidapi.com/api";

export const createAPI = (): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
    },
  });
};
