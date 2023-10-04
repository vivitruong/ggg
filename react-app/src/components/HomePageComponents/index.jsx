import { Link } from "react-router-dom";
import { selectedPlayListSongs } from "../../slices/playlistsSlice";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Button from "../Button";
import {
  getAllSongs,
  getSongs,
  playAudio,
  playSong,
} from "../../slices/songsSlice";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import Overlay from "../Overlay";
import CreateSong from "../CreateSong";
import { useDeleteSongMutation } from "../../slices/songsApiSlice";

const HomePageComponents = ({ allPlaylists }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [songToEditOrDelete, setSongToEditOrDelete] = useState(null);

  const [artist, setArtist] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [filePath, setFilePath] = useState("");
  const [genre, setGenre] = useState("");
  const [name, setName] = useState("");

  const { allSongs } = useSelector((state) => state.songs);
  const [deleteSong] = useDeleteSongMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectedPlayListSongs([]));
  }, []);

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

  const deleteSongHandler = async (song) => {
    const res = await deleteSong({ songId: song?.id });
    console.log(song);
    console.log(res);
    // dispatch();
    // removeSongToSelectedPlayList({ playlist, removeSong: song })
  };

  const createOrEditSong = async () => {
    const songToCreateOrEdit = {
      name,
      artist,
      coverPhoto,
      filePath,
      genre,
    };
    console.log(songToCreateOrEdit);
    setShowModal(false);
    setEditModal(false);
    // try {
    //   const res = await createUserSong({
    //     song: JSON.stringify(songToCreateOrEdit),
    //   }).unwrap();
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const reset = () => {
    setArtist("");
    setCoverPhoto("");
    setFilePath("");
    setGenre("");
    setName("");
  };

  useEffect(() => {
    if (songToEditOrDelete) {
      setArtist(songToEditOrDelete.artist || "");
      setCoverPhoto(songToEditOrDelete.coverPhoto || "");
      setFilePath(songToEditOrDelete.filePath || "");
      setGenre(songToEditOrDelete.genre || "");
      setName(songToEditOrDelete.name || "");
    }
  }, [songToEditOrDelete]);

  // useEffect(() => {
  //   dispatch(getSongs({ songs: allSongs }));
  // }, [dispatch, allSongs]);

  const renderAllSong = allSongs?.map((song, index) => {
    return (
      <div
        className={`song-row songs`}
        key={song?.id}
        onClick={() => {
          dispatch(getSongs({ songs: allSongs }));
          dispatch(playSong({ song: song, index }));
          dispatch(playAudio());
        }}
      >
        <span className="song-column id-column">{index + 1}</span>
        <div className="song-column title">
          <span className=" title-column">{song?.name}</span>
          <span className=" artist-column">{song?.artist}</span>
        </div>
        <Button
          iconOnly
          onClick={(e) => {
            e.stopPropagation();
            setDeleteModal(true);
            setSongToEditOrDelete(song);
          }}
        >
          Delete Song
        </Button>
        <Button
          iconOnly
          onClick={(e) => {
            e.stopPropagation();
            setEditModal(true);
            setSongToEditOrDelete(song);
          }}
        >
          Edit Song
        </Button>
      </div>
    );
  });

  return (
    <>
      <div>
        <div className="conn">
          <h2>PlayLists</h2>
          <div className="pList">{renderPlayList}</div>
        </div>
        <div className="conn">
          <div className="create">
            <h2>All Songs</h2>
            <Button iconOnly onClick={() => setShowModal(true)}>
              Create Song
            </Button>
          </div>
          <div className="allsongs">{renderAllSong}</div>
        </div>
      </div>

      {showModal && (
        <>
          <Overlay onClose={() => setShowModal(false)} />
          <Modal>
            <CreateSong
              artist={artist}
              coverPhoto={coverPhoto}
              filePath={filePath}
              genre={genre}
              name={name}
              setArtist={setArtist}
              setCoverPhoto={setCoverPhoto}
              setFilePath={setFilePath}
              setGenre={setGenre}
              setName={setName}
              onSubmitHandler={createOrEditSong}
              btnText={"Create"}
            />
          </Modal>
        </>
      )}
      {showEditModal && (
        <>
          <Overlay
            onClose={() => {
              setSongToEditOrDelete(null);
              setEditModal(false);
              reset();
            }}
          />
          <Modal>
            <CreateSong
              artist={artist}
              coverPhoto={coverPhoto}
              filePath={filePath}
              genre={genre}
              name={name}
              setArtist={setArtist}
              setCoverPhoto={setCoverPhoto}
              setFilePath={setFilePath}
              setGenre={setGenre}
              setName={setName}
              onSubmitHandler={createOrEditSong}
              btnText={"Edit"}
            />
          </Modal>
        </>
      )}
      {showDeleteModal && (
        <>
          <Overlay onClose={() => setDeleteModal(false)} />
          <div className="deleteModal">
            <h2>
              Are You Sure you want to delete? {songToEditOrDelete.name} song
            </h2>
            <div className="btns">
              <Button
                iconOnly
                onClick={() => deleteSongHandler(songToEditOrDelete)}
              >
                Delete
              </Button>
              <Button
                iconOnly
                onClick={() => {
                  setDeleteModal(false);
                  reset();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePageComponents;
