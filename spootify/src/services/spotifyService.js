import axios from "axios";
import qs from "querystring";
import config from "../config";

const { api } = config;

const authInstance = axios.create({
  baseURL: api.authUrl,
});

authInstance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const instanceWithToken = axios.create({
  baseURL: `${api.baseUrl}/browse`,
  params: {
    locale: "en_US",
  },
});

instanceWithToken.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export async function getToken() {
  const {
    data: { access_token: token },
  } = await authInstance.post(
    "",
    qs.stringify({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: `Basic ${btoa(`${api.clientId}:${api.clientSecret}`)}`,
      },
    }
  );
  return token;
}

export async function getReleases() {
  const {
    data: { albums },
  } = await instanceWithToken.get(`/new-releases`);
  return albums;
}

export async function getPlaylists() {
  const {
    data: { playlists },
  } = await instanceWithToken.get(`/featured-playlists`);
  return playlists;
}

export async function getCategories() {
  const {
    data: { categories },
  } = await instanceWithToken.get(`/categories`);
  return categories;
}
