import { AsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import { store } from "../redux/store";

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
};

export type StatusResponse = {
  status: number;
  status_message: string;
};

export type Filter = {
  categories: string[];
  platform: string | null;
  sorting: string | null;
};

export type GameInfo = {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  minimum_system_requirements?: MinimumSystemRequirements;
  screenshots: Screenshot[];
};

export type MinimumSystemRequirements = {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
};

export type Screenshot = {
  id: number;
  image: string;
};
