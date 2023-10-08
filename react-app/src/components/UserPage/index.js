import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as userSongsAction from '../../store/userSong'
import './style.css'
import Divider from '../Divider'
const UserPage = () => {
    const songs = useSelector(state => state.userSongs.songs);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(userSongsAction.fetchUserSongs());
    }, [dispatch])

    return (
        <div className="userprofile-container">

            <div className="userprofile-info">

                {user &&
                    <div className="userprofile-info-main">
                        <div className="userprofile-info-img">

                            <img style={{width: '60px', backgroundColor:'#018282'}} src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/avatar11.png' alt='icon'/>
                        </div>
                        <div className="userprofile-info-content">
                            <div className="userprofile-info-content-profile" >

                            </div>
                            <div className="userprofile-info-content-name" style={{fontSize: "1rem"}}>
                                <span style={{fontWeight: '700'}}>Hello {user.firstName} {user.lastName}!</span>

                                <span style={{fontWeight:'600'}}>Thank you for being a part of Golden Era Grooves's family! We're only cool people in here 😉 </span>
                            </div>

                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default UserPage;
