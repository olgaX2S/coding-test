import axios from "axios";
import qs from "querystring";
import config from "../config";

const { api } = config;

const instance = axios.create({
  baseURL: `${api.baseUrl}/browse`,
  params: {
    locale: "en_US",
  },
});

export async function getToken() {
  const {
    data: { access_token: token },
  } = await axios.post(
    api.authUrl,
    qs.stringify({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${api.clientId}:${api.clientSecret}`)}`,
      },
    }
  );
  return token;
}

export async function getReleases(token) {
  const {
    data: { albums },
  } = await instance.get(`/new-releases`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return albums;
}

export async function getPlaylists(token) {
  const {
    data: { playlists },
  } = await instance.get(`/featured-playlists`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return playlists;
}

export async function getCategories(token) {
  const {
    data: { categories },
  } = await instance.get(`/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return categories;
}
