import ActionBar from "../components/ActionBar";
import PlayListHeader from "../components/PlayListHeader";
import Songs from "../components/Songs";
import Divider from "../components/Divider";
import { postALike, getLikesBySongId } from "../store/like";
import { useDispatch, useSelector } from "react-redux";
const LikedSongsPage = () => {
  // const { likedSong } = useSelector((state) => state?.likedSongs);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const likedSong = useSelector(getLikesBySongId)

  return (
    <div style={{ width: "100%" }}>
      {/* <PlayListHeader /> */}
      <Divider />
      <ActionBar />
      <Divider />
      {/* {likedSong.length === 0 ? (
        <h4>You don't have any liked songs yet 😁</h4>
      ) : (
        <Songs songs={likedSong} />
      )} */}
      {/* {likedSong.length === 0 ? ( */}
      <h4>You don't have any liked songs yet 😁</h4>
      {/* ) : ( */}
      {/* <Songs songs={likedSong} /> */}
      {/* )} */}
    </div>
  );
};

export default LikedSongsPage;
