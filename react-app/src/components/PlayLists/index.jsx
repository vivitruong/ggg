// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { getSongs, playAudio, playSong } from "../../slices/songsSlice";
import "./style.css";
import * as playlistAction from '../../store/playlist';
import { useDeleteSongMutation } from "../../slices/songsApiSlice";
import { selectedPlayListSongs } from "../../slices/playlistsSlice";
import { Link } from "react-router-dom";


const PlayLists = ({allPlaylists}) => {
  const dispatch = useDispatch();
  const playlists = useSelector(state => state.playlists.playlists);

  // const { playlists } = useSelector((state) => state.playlists);
  const user = useSelector(state => state.session.user);
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(playlistAction.fetchUserList(user.id));
}, [dispatch, user]);

  const handlePlaylistClick = (playlistName) => {
    dispatch(getSongs({ playlists, playlistName }));
    // navigate("/playlists");
  };
  const renderPlayList = allPlaylists?.map((playlist) => {
    return (
      <Link
        to={`/playlist/${playlist.name}`}
        onClick={() => dispatch(selectedPlayListSongs(playlist))}
        key={playlist.id}
      >
        <div className="playlist">{playlist.name}</div>
      </Link>
    );
  });
  console.log(renderPlayList, 'playlist herre')
  const renderList = playlists?.map((playlist, index) => {
    return (

      <div
        key={index}

        className={`playListName `}
        onClick={() => handlePlaylistClick(playlist.name)}
      >
        {playlist.name}
      </div>
    );
  });
  return (
    <div className="playList">
      <h2>My Playlists</h2>

    </div>
  );
};

export default PlayLists;
