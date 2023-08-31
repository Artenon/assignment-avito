import { GameInfo } from "../types/types";

export const fakeGameInfo = (id: number): GameInfo => ({
  id,
  title: "title",
  thumbnail: "str",
  status: "str",
  short_description: "str",
  description: "str",
  game_url: "str",
  genre: "genre",
  platform: "platform",
  publisher: "publisher",
  developer: "developer",
  release_date: "01.01.01",
  freetogame_profile_url: "str",
  minimum_system_requirements: {
    os: "os",
    processor: "processor",
    memory: "memory",
    graphics: "graphics",
    storage: "storage",
  },
  screenshots: [
    {
      id: 0,
      image: "image",
    },
  ],
});

export const fakeGameLessInfo = (id: number): GameInfo => ({
  id,
  title: "title",
  thumbnail: "str",
  status: "str",
  short_description: "str",
  description: "str",
  game_url: "str",
  genre: "genre",
  platform: "platform",
  publisher: "publisher",
  developer: "developer",
  release_date: "01.01.01",
  freetogame_profile_url: "str",
  screenshots: [],
});
