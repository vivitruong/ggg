import { useSelector } from "react-redux";
import ActionBar from "../components/ActionBar";
import PlayListHeader from "../components/PlayListHeader";
import Songs from "../components/Songs";
import Divider from "../components/Divider";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useState } from "react";
const PlaylistsPage = () => {
  const currentPlayLists = useSelector((state) => state.userPlaylists);
  const [playlist, setCurrentPlaylist] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const list = currentPlayLists?.filter(
      (pl) => parseInt(pl?.id) === parseInt(id)
    );
    setCurrentPlaylist(...list);
  }, [playlist, id, currentPlayLists]);

  return (
    <div style={{ width: "100%" }}>
      <Divider />
      <PlayListHeader songsInPlayList={playlist?.playlist_songs} />
      <Divider />
      <ActionBar />
      <Divider />
      {playlist?.playlist_songs?.length === 0 ? (
        <h4>Uh-oh! 🙉 Looks like this playlist is feeling a bit lonely. Time to add some songs and bring the party to life! 🎉💃</h4>
      ) : (
        <Songs songs={playlist?.playlist_songs} />
      )}
    </div>
  );
};

export default PlaylistsPage;
