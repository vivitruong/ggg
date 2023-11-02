import ActionBar from "../components/ActionBar";
import PlayListHeader from "../components/PlayListHeader";
import Songs from "../components/Songs";
import Divider from "../components/Divider";
import { likeSelector } from "../store/like";

import { useDispatch, useSelector } from "react-redux";

const LikedSongsPage = () => {
  const songs = useSelector((state)=>state.songs)
  const userId = useSelector(state => state.session.user.id)
  const likedSongIds  = useSelector((state) => state?.likes[userId]) || [];

  const likedSongs = songs.filter(song=>likedSongIds.includes(song.id))
  console.log(likedSongs)
  // const getLikesBySongId = (state) => songId ? songId.map((id) => state.songs?.songs[id]): [];
  // const likes = useSelector(likeSelector)
  // const likedSongs = useSelector(getLikesBySongId(likes))



  return (
    <div style={{ width: "100%" }}>
      {/* <PlayListHeader /> */}

      <Divider />
      <ActionBar />


      <Divider />
      {likedSongs.length === 0 ? (
        <h4>You don't have any liked songs yet 😁</h4>
      ) : (
        <Songs songs={likedSongs} />
      )}
      {/* {likedSong.length === 0 ? ( */}
      {/* <h4>You don't have any liked songs yet 😁</h4> */}
      {/* ) : ( */}
      {/* <Songs songs={likedSong} /> */}
      {/* )} */}
    </div>
  );
};

export default LikedSongsPage;
