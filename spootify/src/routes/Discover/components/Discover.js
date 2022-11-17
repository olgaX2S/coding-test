import React, { useState, useEffect } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import {
  getToken,
  getCategories,
  getPlaylists,
  getReleases,
} from "../../../services/spotifyService";

export default function Discover() {
  const [newReleases, setNewReleases] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllInfo = async () => {
      try {
        const token = await getToken();
        sessionStorage.setItem("token", token);
        const [releases, playlists, categories] = await Promise.all([
          getReleases(),
          getPlaylists(),
          getCategories(),
        ]);
        setNewReleases(releases.items);
        setPlaylists(playlists.items);
        setCategories(categories.items);
      } catch (error) {
        alert(error.message);
      }
    };
    getAllInfo();
  }, []);

  return (
    <div className="discover">
      <DiscoverBlock
        text="RELEASED THIS WEEK"
        id="released"
        data={newReleases}
      />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock
        text="BROWSE"
        id="browse"
        data={categories}
        imagesKey="icons"
      />
    </div>
  );
}
