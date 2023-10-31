
import React, { useState } from "react";
// import InputField from "../InputField";
// import Button from "../Button";
// import { useCreateSongMutation } from "../../slices/songsApiSlice";
import { useDispatch } from "react-redux";
import { fetchAllSongs } from "../../store/song";
import { useHistory } from "react-router-dom";
import './style.css';
import { createSong } from "../../store/userSong";
import Loader from "../Spinner";
const CreateSong = () => {
  const [artist, setArtist] = useState("");
  const [cover_photo, setCoverPhoto] = useState("");
  const [file_path, setFilePath] = useState("");
  const [genre, setGenre] = useState("Pop");
  const [name, setName] = useState("");
  const [songLoading, setSongLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false);

  const [error, setErrors] = useState({});

  const history = useHistory()
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
  e.preventDefault();

  const errors = {};

  if(!name) errors.name = 'Song name is required';
  if(!genre) errors.genre = 'Genre is required';
  if(!artist) errors.artist = "Artist is required"

  if (cover_photo[0]  && cover_photo[0].name) {
      const allowedExtensions = ['png', 'jpg', 'jpeg'];

      let fileExtension = cover_photo[0].name.split('.')
      fileExtension = fileExtension[fileExtension.length-1]
      // console.log(fileExtension)

      if (!allowedExtensions.includes(fileExtension)) {
        errors.cover_photo = 'Image file must have a valid extension: .png, .jpg, .jpeg';
      }
    } else {
      errors.cover_photo = 'Cover photo is required';
    }

    if (file_path  && file_path.name) {
      const allowedExtensions = ['mp3'];
      let fileExtension = file_path.name.split('.')
      fileExtension = fileExtension[fileExtension.length-1]


      if (!allowedExtensions.includes(fileExtension)) {
        errors.file_path = 'Song/Track file must have a valid extension: .mp3';
      }
    } else {
      errors.file_path = 'Song/Track file is required';
    }


  setErrors(errors);

  if (Object.keys(error).length === 0) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("genre", genre);
  formData.append("cover_photo", cover_photo[0]);
  formData.append("file_path", file_path)
  formData.append('artist', artist)

  // setImageLoading(true);
  // setSongLoading(true);

  try {
    const res = await dispatch(createSong(formData));
    if (res){
      const allSongs = fetchAllSongs();
      dispatch(allSongs);
      console.log(res)
      setSongLoading(true)
      setImageLoading(true);
      history.push("/");
    }

  } catch (err){
      setErrors({});
      console.error("Error creating song:", err);
      setImageLoading(false);
      setSongLoading(false);

  }
}
  }


  return (
    <>
    <div className="title-bar">
  <div className="title-bar-text">Songs/Tracks</div>
  <div className="title-bar-controls">

  </div>
</div>
    <div className="page-container">
        <div className="form-create">



            <form
                onSubmit={handleSubmit}

            >
                <div>
                <div className="error-message">{error.name && <p className="">{error.name}</p>}</div>
                <label className="songcreate-title"> Title :  <span style={{color:"red", fontSize:"1rem"}}>*</span>

                    <input
                        className="input-create"
                        type='text'
                        placeholder="Title of your song"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                 <div className="error-message">{error.artist && <p className="">{error.artist}</p>}</div>
                <label className="songcreate-title">Artist : <span style={{color:"red", fontSize:"1rem"}}>*</span>

                    <input
                        className="input-create"
                        type='text'
                        placeholder="Artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                    />
                </label>
                </div>
                <div>

                 <label className="songcreate-title">Genre : <span style={{color:"red", fontSize:"1rem"}}>*</span> </label>
                        <select className="" style={{ margin: 'auto'}} value={genre} onChange={e => setGenre(e.target.value)} >
                            <option value="Pop">Pop</option>
                            <option value="rnb">R&B</option>
                            <option value="rock">Rock</option>
                            <option value="electronic">Electronic</option>
                            <option value="classical">Classical</option>
                            <option value="hiphop">Hiphop & Rap</option>
                            <option value='Instrumental'>Instrumental</option>
                            <option value='Alternatives'>Alternatives</option>
                            <option value='country'>Country</option>
                            <option value='other'>Other</option>
                        </select>
                </div>
                <div>
                <div className="error-message">{error.cover_photo && <p className="">{error.cover_photo}</p>}</div>
                {(imageLoading) && <p>...image is uploading</p>}
                <label className="songcreate-title">

                    Select Cover Photo:
                    <span style={{color:"red", fontSize:"1rem"}}>*</span>
                    <input
                        className="input-create"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {setCoverPhoto(e.target.files)

                        }}
                        style={{cursor:'pointer'}}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{error.file_path && <p className="">{error.file_path}</p>}</div>
                {(songLoading) && <p>...song is uploading</p>}
                <label className="songcreate-title">
                    Select Song :
                    <span style={{color:"red", fontSize:"1rem"}}>*</span>
                    <input
                        className="input-create"
                        type="file"
                        accept="song/*"
                        onChange={(e) => setFilePath(e.target.files[0])}
                        style={{cursor:'pointer'}}
                    />
                </label>
                </div>
                <div style={{padding:'10px 0'}} className="align-create-button">
                <button style={{cursor:'pointer'}} className='create-button test' type="submit">UPLOAD</button>
                </div>

                <p style={{paddingBottom:'5px'}}>By uploading, you confirm that your file comply with our Terms of Use*.</p>
                <img src="https://goldeneragrooves.s3.us-east-2.amazonaws.com/giphy.gif" width="200" height="140" frameBorder="0" class="giphy-embed"></img>
            </form>
        </div>
        </div>
        </>
  );
};

export default CreateSong;
