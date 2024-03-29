// import { useDispatch, useSelector } from "react-redux";
// // import { playSong, playAudio } from "../../slices/songsSlice";
// import { useParams } from "react-router-dom";

// import "./style.css";
// import Button from "../Button";
// import { removeSongFromPlaylist } from "../../store/playlist";
// import {
//   currentPlayListSongs,
//   playAudio,
//   playSong,
// } from "../../store/slices/playlistSlice";

// const Songs = ({ songs }) => {
//   // const { currentSongIndex } = useSelector((state) => state.playSong);
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   const renderList = songs?.map((song, index) => {
//     // const active = currentSongIndex === index;
//     return (

//       <div

//         className={`song-row songs`}
//         key={index}
//         onClick={() => {
//           const queueSongs = songs.map((song) => song.song);
//           dispatch(currentPlayListSongs({ songs: queueSongs }));
//           dispatch(playSong({ song: song?.song, index }));
//           dispatch(playAudio());
//         }}
//       >
//         <span className="song-column id-column">{index + 1}</span>
//         <div className="song-column title">
//           <span className=" title-column">{song?.song?.name}</span>
//           <span className=" artist-column">{song?.song?.artist}</span>
//         </div>
//         <span className="song-column album-column">{song?.song?.album}</span>
//         <span className="song-column date-added-column">
//           {song?.song?.date_added}
//         </span>
//         <span className="song-column duration-column">
//           {song?.song?.duration}
//         </span>
//         <Button
//           iconOnly
//           onClick={(e) => {
//             e.stopPropagation();
//             dispatch(
//               removeSongFromPlaylist({
//                 songId: song?.song?.id,
//                 playlist_id: id,
//               })
//             );
//             // dispatch();
//             // removeSongToSelectedPlayList({ playlist, removeSong: song })
//           }}
//         >
//           Remove
//         </Button>
//       </div>

//     );
//   });

//   return (
//     <>

//         <div className="song-row header-row">
//           <span className="song-column id-column">#</span>
//           <span className="song-column title-column">Title</span>
//           <span className="song-column album-column">Album</span>
//           <span className="song-column date-added-column" >Date Added</span>
//           <span className="song-column duration-column">Duration</span>
//         </div>
//         <div className="table">{renderList}</div>


//     </>
//   );
// };

// export default Songs;

import { useDispatch, useSelector } from "react-redux";
// import { playSong, playAudio } from "../../slices/songsSlice";
import { useParams } from "react-router-dom";

import "./style.css";
import Button from "../Button";
import { removeSongFromPlaylist } from "../../store/playlist";
import {
  currentPlayListSongs,
  playAudio,
  playSong,
} from "../../store/slices/playlistSlice";

const Songs = ({ songs }) => {
  // const { currentSongIndex } = useSelector((state) => state.playSong);
  const dispatch = useDispatch();
  const { id } = useParams();
  const renderList = songs?.map((song, index) => {
    // const active = currentSongIndex === index;
    return (

      <div

        className={`song-row songs`}
        key={index}
        onClick={() => {
          const queueSongs = songs.map((song) => song);
          dispatch(currentPlayListSongs({ songs: queueSongs }));
          dispatch(playSong({ song: song, index }));
          dispatch(playAudio());
        }}
      >
        <span className="song-column id-column">{index + 1}</span>
        <div className="song-column title">
          <span className=" title-column">{song?.name}</span>
          <span className=" artist-column">{song?.artist}</span>
        </div>
        <span className="song-column album-column">{song?.album}</span>
        <span className="song-column date-added-column">
          {song?.date_added}
        </span>
        <span className="song-column duration-column">
          {song?.duration}
        </span>
        <Button
          iconOnly
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              removeSongFromPlaylist({
                songId: song?.id,
                playlist_id: id,
              })
            );
            // dispatch();
            // removeSongToSelectedPlayList({ playlist, removeSong: song })
          }}
        >
          Remove
        </Button>
      </div>

    );
  });

  return (
    <>

        <div className="song-row header-row">
          <span className="song-column id-column">#</span>
          <span className="song-column title-column">Title</span>
          <span className="song-column album-column">Album</span>
          <span className="song-column date-added-column" >Date Added</span>
          <span className="song-column duration-column">Duration</span>
        </div>
        <div className="table">{renderList}</div>


    </>
  );
};

export default Songs;
