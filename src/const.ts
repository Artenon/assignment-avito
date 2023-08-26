import { ToastOptions } from "react-toastify";

export const toastifyOptions: ToastOptions = {
  theme: "dark",
  position: "bottom-right",
  autoClose: 2500,
};

export enum AppRoute {
  Main = "/",
  Game = "/game",
}

export enum APIRoute {
  Games = "/games",
  Game = "/game",
  Filter = "/filter",
}

export enum NameSpace {
  GAMES = "GAMES",
  CURRENT_GAME = "CURRENT_GAME",
}

export const sortOptions = [
  { value: "release-date", label: "Release Date" },
  { value: "popularity", label: "Popularity" },
  { value: "alphabetical", label: "Alphabetical" },
  { value: "relevance", label: "Relevance" },
];

export const platforms = [
  { value: "pc", label: "Windows (PC)" },
  { value: "browser", label: "Browser" },
  { value: "all", label: "All" },
];

export const genres = [
  "mmorpg",
  "shooter",
  "strategy",
  "moba",
  "racing",
  "sports",
  "social",
  "sandbox",
  "open-world",
  "survival",
  "pvp",
  "pve",
  "pixel",
  "voxel",
  "zombie",
  "turn-based",
  "first-person",
  "third-Person",
  "top-down",
  "tank",
  "space",
  "sailing",
  "side-scroller",
  "superhero",
  "permadeath",
  "card",
  "battle-royale",
  "mmo",
  "mmofps",
  "mmotps",
  "3d",
  "2d",
  "anime",
  "fantasy",
  "sci-fi",
  "fighting",
  "action-rpg",
  "action",
  "military",
  "martial-arts",
  "flight",
  "low-spec",
  "tower-defense",
  "horror",
  "mmorts",
];
