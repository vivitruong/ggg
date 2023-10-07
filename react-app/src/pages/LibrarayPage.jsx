import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";
import Overlay from "../components/Overlay";
import Modal from "../components/Modal";
import CreateSong from "../components/CreateSong";
import { updateASong, deleteSong } from "../store/userSong";
import { playAudio, playSong } from "../store/slices/playlistSlice";
import EditSong from "../components/EditSong";

const LibrarayPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [songToEditOrDelete, setSongToEditOrDelete] = useState(null);

  const [artist, setArtist] = useState("");
  const [cover_photo, setCoverPhoto] = useState("");
  const [file_path, setFilePath] = useState("");
  const [genre, setGenre] = useState("");
  const [name, setName] = useState("");
  const [songId, setSongId] = useState(null);

  const dispatch = useDispatch();

  const userSongs = useSelector((state) => state.userSongs);

  const deleteSongHandler = (song) => {
    dispatch(deleteSong({ songId: song?.id }));
    setShowModal(false);
    setEditModal(false);
  };

  const editSong = async () => {
    const songToEdit = {
      name,
      artist,
      cover_photo,
      file_path,
      genre,
      id: songId,
    };

    try {
      dispatch(updateASong(songToEdit));
      setShowModal(false);
      setEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createSong = () => {
    const songToCreate = {
      name,
      artist,
      cover_photo,
      file_path,
      genre,
      id: songId,
    };

    try {
      // Create your song here.... import the create funtion and dispatch it
      setShowModal(false);
      setEditModal(false);
    } catch (error) {
      console.log(error);
    }
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
      setCoverPhoto(songToEditOrDelete.cover_photo || "");
      setFilePath(songToEditOrDelete.file_path || "");
      setGenre(songToEditOrDelete.genre || "");
      setName(songToEditOrDelete.name || "");
    }
  }, [songToEditOrDelete]);

  const renderUserSongs = userSongs.map((song, index) => (
    <div
      className={`song-row songs`}
      key={song?.id}
      onClick={() => {
        // dispatch(getSongs({ songs: allSongs }));
        // dispatch(playSong({ song: song, index }));
        // dispatch(playAudio());
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
          setSongId(song?.id);
        }}
      >
        Edit Song
      </Button>
    </div>
  ));
  return (
    <>
      <div className="conn">
        <div className="conn">
          <div className="create">
            <h4>My Songs 🎵 😁 </h4>
            <Button iconOnly onClick={() => setShowModal(true)}>
              Create Song
            </Button>
          </div>
        </div>
        {renderUserSongs}
      </div>
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
              cover_photo={cover_photo}
              file_path={file_path}
              genre={genre}
              name={name}
              setArtist={setArtist}
              setCoverPhoto={setCoverPhoto}
              setFilePath={setFilePath}
              setGenre={setGenre}
              setName={setName}
              onSubmitHandler={editSong}
              btnText={"Edit"}
            />
          </Modal>
        </>
      )}
      {showDeleteModal && (
        <>
          <Overlay onClose={() => setDeleteModal(false)} />
          <div className="deleteModal">
          <div class="title-bar inactive">
  <div class="title-bar-text">Delete</div>
  <div class="title-bar-controls">

  </div>
</div>
            <h4>
              Are You Sure you want to delete "{songToEditOrDelete?.name}" song? <img src='https://win98icons.alexmeub.com/icons/png/msg_error-2.png'></img>
            </h4>
            <div className="btns">
              <Button
                iconOnly
                onClick={() => {
                  deleteSongHandler(songToEditOrDelete);

                }

                }

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
      {showModal && (
        <>
          <Overlay onClose={() => setShowModal(false)} />
          <Modal>
            <CreateSong

              artist={artist}
              cover_photo={cover_photo}
              file_path={file_path}
              genre={genre}
              name={name}
              setArtist={setArtist}
              setCoverPhoto={setCoverPhoto}
              setFilePath={setFilePath}
              setGenre={setGenre}
              setName={setName}
              onSubmitHandler={editSong}
              btnText={"Create"}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default LibrarayPage;
