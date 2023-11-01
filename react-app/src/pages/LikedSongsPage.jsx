import ActionBar from "../components/ActionBar";
import PlayListHeader from "../components/PlayListHeader";
import Songs from "../components/Songs";
import Divider from "../components/Divider";
import { likeSelector } from "../store/like";

import { useDispatch, useSelector } from "react-redux";

const LikedSongsPage = () => {
  // const { likedSong } = useSelector((state) => state?.likedSongs);
  const dispatch = useDispatch();
  const getLikesBySongId = (songId) => (state) => songId ? songId.map((id) => state.songs?.songs[id]): [];
  const likes = useSelector(likeSelector)
  const likedSongs = useSelector(getLikesBySongId(likes))

  // const likedSong = useSelector(getLikesBySongId)

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
