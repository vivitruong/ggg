import { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import { useCreateSongMutation } from "../../slices/songsApiSlice";
import { useDispatch } from "react-redux";

const CreateSong = ({
  artist,
  coverPhoto,
  filePath,
  genre,
  name,
  setArtist,
  setCoverPhoto,
  setFilePath,
  setGenre,
  setName,
  onSubmitHandler,
  btnText,
}) => {
  // const [createUserSong] = useCreateSongMutation();

  // const dispatch = useDispatch();

  const submitHandler = async function (e) {
    e.preventDefault();
    onSubmitHandler();
  };

  return (
    <form action="" onSubmit={submitHandler} className="form">
      <InputField
        name="artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        id="artist"
        type="text"
        placeholder="Artist"
      />
      <InputField
        className="input"
        required
        name="coverPhoto"
        value={coverPhoto}
        onChange={(e) => setCoverPhoto(e.target.value)}
        id="coverPhoto"
        type="text"
        placeholder="CoverPhoto"
      />
      <InputField
        className="input"
        required
        name="filePath"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
        id="filePath"
        type="text"
        placeholder="FilePath"
      />
      <InputField
        className="input"
        required
        name="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        id="genre"
        type="text"
        placeholder="Genre"
      />
      <InputField
        className="input"
        required
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="name"
        type="text"
        placeholder="Song Name"
      />
      <Button iconOnly>{btnText}</Button>
    </form>
  );
};

export default CreateSong;
