// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getSongs } from "../../slices/songsSlice";
import "./style.css";
import { currentPlayListSongs } from "../../store/slices/playlistSlice";
import { useHistory } from "react-router-dom";
// import { useGetCurrentUserPlayListQuery } from "../../slices/playListApiSlice";

const PlayLists = () => {
  // const { data: usersPlaylist } = useGetCurrentUserPlayListQuery();
  const dispatch = useDispatch();
  const history = useHistory();

  const playlists = useSelector((state) => state.userPlaylists);
  // const navigate = useNavigate();

  const handlePlaylistClick = (playlist) => {
    console.log(playlist);
    dispatch(currentPlayListSongs({ songs: playlist?.playlist_songs }));
    history.push(`/playlists/${playlist.id}`);
  };

  const renderList = playlists?.map((playlist, index) => {
    return (
      <div
        key={index}
        // className={`playListName ${isActive ? "active" : ""}`}
        className={`playListName `}
        onClick={() => handlePlaylistClick(playlist)}
      >
        {playlist?.name}
      </div>
    );
  });
  return (
<div className="playList">
  <span style={{ fontSize: '17px', paddingBottom:'10px', fontWeight: '600', color:'blue' }}>
    My Playlists <img src='https://win98icons.alexmeub.com/icons/png/cd_audio_cd-1.png' alt="CD Icon" />
  </span>

  {renderList.map((item, index) => (
    <div key={index} style={{ padding: '6px 0', fontWeight:'600', fontSize:'12.5px' }}>

      {item}
    </div>
  ))}
</div>
  );
};

export default PlayLists;
