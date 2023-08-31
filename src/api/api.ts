import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://free-to-play-games-database.p.rapidapi.com/api";

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_API_KEY!,
    },
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config } = error;

      if (!config) {
        return Promise.reject(error);
      }

      const retryCount = (config.retryCount || 0) + 1;
      config.retryCount = retryCount;
      if (retryCount <= 3) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(api(config));
          }, retryCount * 2000);
        });
      }
      return Promise.reject(error);
    }
  );

  return api;
};
