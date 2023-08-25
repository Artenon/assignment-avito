export enum AppRoute {
  Main = "/",
}

export enum APIRoute {
  Games = "/games",
  Game = "/game",
  Filter = "/filter",
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
