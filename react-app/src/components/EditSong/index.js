import React, { useState, useEffect } from "react";
import InputField from "../InputField";
import Button from "../Button";
// import { useCreateSongMutation } from "../../slices/songsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import * as songActions from '../../store/song';
import * as userSongsActions from '../../store/userSong'
import { useHistory, useParams } from "react-router-dom";
import './style.css'

const EditSong = () => {
  const [artist, setArtist] = useState("");
  const [cover_photo, setCoverPhoto] = useState("");
  const [file_path, setFilePath] = useState("");
  const [genre, setGenre] = useState("");
  const [name, setName] = useState("");
  const [songLoading, setSongLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setErrors] = useState({});
  const history = useHistory()
  const { id } = useParams();
  console.log(id, 'this is id song')
  const song = useSelector((state) => state?.userSongs[id]);
  const dispatch = useDispatch();
  console.log(song, 'check song')
  useEffect(() => {
    if(!song) {
      dispatch(songActions.getOneSong(id))
      .then((songDetail) => {
        if(songDetail) {
          setName(songDetail.name);
          setGenre(songDetail.genre);
          setCoverPhoto(songDetail.cover_photo);
          setFilePath(songDetail.file_path)
        }
        console.log('i!!!!d', songDetail)
      }).catch((err) => {
        console.error('Error song details', err)
      })
    }
  },[dispatch, id, song])
  const handleSubmit = async (e) => {
  e.preventDefault();



  const errors = {};


  if(!name) errors.name = 'Song name is required';
  if(!genre) errors.genre = 'Genre is required';
  if(!artist) errors.artist = "artist is required"

  if (cover_photo[0]  && cover_photo[0].name) {
      const allowedExtensions = ['png', 'jpg', 'jpeg'];

      let fileExtension = cover_photo[0].name.split('.')
      fileExtension = fileExtension[fileExtension.length-1]
      console.log(fileExtension)

      if (!allowedExtensions.includes(fileExtension)) {
        errors.cover_photo = 'Image file must have a valid extension: .png, .jpg, .jpeg';
      }
    } else {
      errors.cover_photo = 'Image is required';
    }
    console.log(file_path)
    if (file_path  && file_path.name) {
      const allowedExtensions = ['mp3'];
      let fileExtension = file_path.name.split('.')
      fileExtension = fileExtension[fileExtension.length-1]


      if (!allowedExtensions.includes(fileExtension)) {
        errors.file_path = 'Song file must have a valid extension: .mp3';
      }
    } else {
      errors.file_path = 'Song file is required';
    }


  setErrors(errors);

  if (Object.keys(error).length === 0) {
    // const formData = {
    //   name,
    //   artist,
    //   cover_photo: cover_photo[0],
    //   file_path: file_path,
    //   genre,

    // }

    console.log('------------2' , file_path)
  const formData = new FormData();
  formData.append("name", name);
  formData.append("genre", genre);
  formData.append("cover_photo", cover_photo[0]);
  formData.append("file_path", file_path)
  formData.append('artist', artist)

  // setImageLoading(true);
  // setSongLoading(true);


  try {

      await dispatch(userSongsActions.updateASong(id, formData));
      history.push("/library");
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
    <div class="title-bar">
  <div class="title-bar-text">Song</div>
  <div class="title-bar-controls">

  </div>
</div>
    <div className="page-container">
        <div className="form-create">
            {/* <h1>Create a New Song</h1> */}
            <form
                onSubmit={handleSubmit}
                method='PUT'
                encType="multipart/form-data"

            >
                <div>
                <div className="error-message">{error.name && <p className="">{error.name}</p>}</div>
                <label> Title <span style={{color:"red", fontSize:"1rem"}}>*</span>

                    <input
                        className="input-create"
                        type='text'
                        placeholder="Song Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>Artist <span style={{color:"red", fontSize:"1rem"}}>*</span>

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
                {/* <div className="error-message">{error.genre && <p className="">{error.genre}</p>}</div> */}
                {/* <label className="label-create">
                    Song Genre
                    <input
                        className="input-create"
                        type='text'
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </label> */}
                 <label >Genre <span style={{color:"red", fontSize:"1rem"}}>*</span> </label>
                        <select style={{ margin: 'auto' }} value={genre} onChange={e => setGenre(e.target.value)} >
                            <option value="pop">Pop</option>
                            <option value="rnb">R&B</option>
                            <option value="rock">Rock</option>
                            <option value="electronic">Electronic</option>
                            <option value="classical">Classical</option>
                            <option value="hiphop">Hiphop & Rap</option>
                            <option value='other'>Other</option>
                        </select>
                </div>
                <div>
                <div className="error-message">{error.cover_photo && <p className="">{error.cover_photo}</p>}</div>
                {(imageLoading)&& <p>Image Uploading...</p>}
                <label className="label-create">
                    Select Cover Photo
                    <input
                        className="input-create"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {setCoverPhoto(e.target.files)

                        }}
                    />
                </label>
                </div>
                <div>
                <div className="error-message">{error.song_url && <p className="">{error.song_url}</p>}</div>
                {(songLoading)&& <p>Song Uploading...</p>}
                <label className="label-create">
                    Select Song
                    <input
                        className="input-create"
                        type="file"
                        accept="song/*"
                        onChange={(e) => setFilePath(e.target.files[0])}
                    />
                </label>
                {(songLoading)&& <p>Loading...</p>}
                </div>
                <div className="align-create-button">
                <button className='create-button test' type="submit">Submit</button>
                </div>
            </form>
        </div>
        </div>
        </>
  );
};

export default EditSong;
