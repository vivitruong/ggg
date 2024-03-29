import { Link } from "react-router-dom";
import Button from "../Button";
import Divider from "../Divider";
import iconHome from "../../assets/homepage-1.svg";
import iconSearch from "../../assets/search_web-1.svg";
import iconComputer from "../../assets/computer_sound-1.svg";
import iconCreatePlaylist from "../../assets/cd_drive-1.svg";
import iconEpisode from "../../assets/channels-1.svg";
import "./style.css";

const Navbar = () => {
  const onClickHandler = () => {

  };
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <Button onClick={onClickHandler}>
                <img src={iconHome} alt="" />
                Home
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <Button onClick={onClickHandler}>
                <img src={iconSearch} alt="" />
                Search
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/library">
              <Button onClick={onClickHandler}>
                <img src='https://win98icons.alexmeub.com/icons/png/multimedia-1.png' alt="" />
               Your Songs
              </Button>
            </Link>
          </li>
        </ul>
        <Divider />
        <ul>
          <li>
            <Link to="/create-playlist">
              <Button onClick={onClickHandler}>
                <img src={iconCreatePlaylist} alt="" />
                Create Playlist
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/liked-songs">
              <Button onClick={onClickHandler}>
                <img src={iconComputer} alt="" />
                Liked Songs
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/comments">
              <Button onClick={onClickHandler}>
                <img src={iconEpisode} alt="" />
                Your Comments
              </Button>
            </Link>
          </li>
          <Divider />

          <li>
            <Link to="/paint">
              <Button onClick={onClickHandler}>
                <img src='https://win98icons.alexmeub.com/icons/png/paint_file-1.png' alt="" />
                Paint
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/game">
              <Button onClick={onClickHandler}>
                <img style={{width: '20px'}} src='https://win98icons.alexmeub.com/icons/png/game_freecell-1.png' alt="" />
                Solitaire
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/mine">
              <Button onClick={onClickHandler}>
                <img style={{width: '20px'}} src='https://win98icons.alexmeub.com/icons/png/game_mine_2-0.png' alt="" />
                Minesweeper
              </Button>
            </Link>
          </li>

        </ul>
        <Divider />
      </nav>
    </header>
  );
};

export default Navbar;
