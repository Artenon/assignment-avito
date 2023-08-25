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
