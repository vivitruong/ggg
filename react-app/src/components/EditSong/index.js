import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as songActions from '../../store/song';
import {updateASong} from '../../store/userSong';
import { useHistory, useParams } from "react-router-dom";
import './style.css'

const EditSong = ({song, setEditModal }) => {
  const {user } = useSelector((state) => state.session)
  const [artist, setArtist] = useState(song?.artist);

  const [genre, setGenre] = useState(song?.genre);

  const [name, setName] = useState(song?.name);
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

  setErrors(errors);

  if (Object.keys(error).length === 0) {
    const formData = {
      name,
      genre,
      artist,
      user_id: user.id
    };
  try {
    const res = await dispatch(updateASong(formData, song.id));
    if (res){
      const allSongs = songActions.fetchAllSongs();
      dispatch(allSongs)
      setEditModal(false)
    }


  } catch (err){
      setErrors({});
      console.error("Error editing song:", err);
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
                method='PUT'
                encType="multipart/form-data"

            >
                <div>
                <div className="error-message">{error.name && <p className="">{error.name}</p>}</div>
                <label className="songcreate-title" > Title :<span style={{color:"red", fontSize:"1rem"}}>*</span>

                    <input
                        className="input-create"
                        type='text'
                        placeholder="Title of your song"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <div className="error-message">{error.artist && <p className="">{error.artist}</p>}</div>
                <label className="songcreate-title" >Artist :<span style={{color:"red", fontSize:"1rem"}}>*</span>

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

                 <label className="songcreate-title" >Genre :<span style={{color:"red", fontSize:"1rem"}}>*</span></label>
                        <select value={genre} onChange={e => setGenre(e.target.value)} >
                            <option value="Pop">Pop</option>
                            <option value="R&B">R&B</option>
                            <option value="Rock">Rock</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Classical">Classical</option>
                            <option value="Hiphop & Rap">Hiphop & Rap</option>
                            <option value='Instrumental'>Instrumental</option>
                            <option value='Alternatives'>Alternatives</option>
                            <option value='Country'>Country</option>
                            <option value='Other'>Other</option>
                        </select>
                </div>

                <div style={{padding:'5px', marginRight:'90px'}} className="align-create-button">
                <button style={{cursor:'pointer'}} className='create-button test' type="submit">Submit</button>
                </div>
                <div>
                  <span style={{marginRight:'10px', fontSize:'11px'}}>If you wish to change the whole track, just delete and re-upload your songs of choice !

                  </span>
                  <img alt="" src="https://goldeneragrooves.s3.us-east-2.amazonaws.com/giphy+(1).gif" width="200" height="140" frameBorder="0" class="giphy-embed"></img>
                </div>
            </form>
        </div>
        </div>
        </>
  );
};

export default EditSong;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as songActions from '../../store/song';
// import {updateASong} from '../../store/userSong';
// import { useHistory, useParams } from "react-router-dom";
// import './style.css'

// const EditSong = ({song, setEditModal }) => {
//   const {user } = useSelector((state) => state.session)
//   const [artist, setArtist] = useState(song?.artist);

//   const [genre, setGenre] = useState(song?.genre);

//   const [name, setName] = useState(song?.name);
//   const [songLoading, setSongLoading] = useState(false)
//   const [imageLoading, setImageLoading] = useState(false);
//   const [error, setErrors] = useState({});
//   const history = useHistory()



//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   const errors = {};

//   if(!name) errors.name = 'Song name is required';
//   if(!genre) errors.genre = 'Genre is required';
//   if(!artist) errors.artist = "Artist is required"

//   setErrors(errors);

//   if (Object.keys(error).length === 0) {
//     const formData = {
//       name,
//       genre,
//       artist,
//       user_id: user.id
//     };
//   try {
//     const res = await dispatch(updateASong(formData, song.id));
//     if (res){
//       const allSongs = songActions.fetchAllSongs();
//       dispatch(allSongs)
//       setEditModal(false)
//     }


//   } catch (err){
//       setErrors({});
//       console.error("Error editing song:", err);
//       setImageLoading(false);
//       setSongLoading(false);
//   }
// }
//   }
//   return (
//     <>
//     <div className="title-bar">
//   <div className="title-bar-text">Songs/Tracks</div>
//   <div className="title-bar-controls">

//   </div>
// </div>
//     <div className="page-container">
//         <div className="form-create">
//             <form
//                 onSubmit={handleSubmit}
//                 method='PUT'
//                 encType="multipart/form-data"

//             >
//                 <div>
//                 <div className="error-message">{error.name && <p className="">{error.name}</p>}</div>
//                 <label className="songcreate-title" > Title :<span style={{color:"red", fontSize:"1rem"}}>*</span>

//                     <input
//                         className="input-create"
//                         type='text'
//                         placeholder="Title of your song"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </label>
//                 <div className="error-message">{error.artist && <p className="">{error.artist}</p>}</div>
//                 <label className="songcreate-title" >Artist :<span style={{color:"red", fontSize:"1rem"}}>*</span>

//                     <input
//                         className="input-create"
//                         type='text'
//                         placeholder="Artist"
//                         value={artist}
//                         onChange={(e) => setArtist(e.target.value)}
//                     />
//                 </label>
//                 </div>
//                 <div>

//                  <label className="songcreate-title" >Genre :<span style={{color:"red", fontSize:"1rem"}}>*</span></label>
//                         <select value={genre} onChange={e => setGenre(e.target.value)} >
//                             <option value="Pop">Pop</option>
//                             <option value="rnb">R&B</option>
//                             <option value="rock">Rock</option>
//                             <option value="electronic">Electronic</option>
//                             <option value="classical">Classical</option>
//                             <option value="hiphop">Hiphop & Rap</option>
//                             <option value='Instrumental'>Instrumental</option>
//                             <option value='Alternatives'>Alternatives</option>
//                             <option value='country'>Country</option>
//                             <option value='other'>Other</option>
//                         </select>
//                 </div>

//                 <div style={{padding:'5px', marginRight:'90px'}} className="align-create-button">
//                 <button style={{cursor:'pointer'}} className='create-button test' type="submit">Submit</button>
//                 </div>
//                 <div>
//                   <span style={{marginRight:'10px', fontSize:'11px'}}>If you wish to change the whole track, just delete and re-upload your songs of choice !

//                   </span>
//                   <img src="https://goldeneragrooves.s3.us-east-2.amazonaws.com/giphy+(1).gif" width="200" height="140" frameBorder="0" class="giphy-embed"></img>
//                 </div>
//             </form>
//         </div>
//         </div>
//         </>
//   );
// };

// export default EditSong;
