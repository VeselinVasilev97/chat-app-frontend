// src/config/index.ts

interface Config {
  API_URL: string;
  API_TIMEOUT: number;
  ACCESS_TOKEN_KEY: string;
  REFRESH_TOKEN_KEY: string;
  ROUTES: {
    HOME: string;
    LOGIN: string;
    REGISTER: string;
    MAIN: string;
    PROFILE: string;
  };
}

const development: Config = {
  API_URL: "http://localhost:3000/api",
  API_TIMEOUT: 10000, // 10 seconds
  ACCESS_TOKEN_KEY: "access_token",
  REFRESH_TOKEN_KEY: "refresh_token",
  ROUTES: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    MAIN: "/main",
    PROFILE: "/profile",
  },
};

const production: Config = {
  API_URL: "https://api.yourproductionserver.com/api",
  API_TIMEOUT: 10000,
  ACCESS_TOKEN_KEY: "access_token",
  REFRESH_TOKEN_KEY: "refresh_token",
  ROUTES: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    MAIN: "/main",
    PROFILE: "/profile",
  },
};

const test: Config = {
  API_URL: "http://localhost:3000/api",
  API_TIMEOUT: 5000,
  ACCESS_TOKEN_KEY: "access_token",
  REFRESH_TOKEN_KEY: "refresh_token",
  ROUTES: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    MAIN: "/main",
    PROFILE: "/profile",
  },
};

// Determine which environment to use
const getConfig = (): Config => {
  switch (process.env.NODE_ENV) {
    case "production":
      return production;
    case "test":
      return test;
    default:
      return development;
  }
};

const config = getConfig();

export default config;
