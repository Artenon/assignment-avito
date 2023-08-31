import { Game } from "../types/types";

export const fakeGame = (id: number): Game => ({
  id,
  title: "title",
  thumbnail: "str",
  short_description: "str",
  game_url: "str",
  genre: "genre",
  platform: "platform",
  publisher: "publisher",
  developer: "developer",
  release_date: "01.01.01",
  freetogame_profile_url: "str",
});
