import * as playlistAction from '../../../../store/playlist';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as queueAction from '../../../../store/queue';
import { useSelector } from 'react-redux';


const DeletePlaylistForm = ({ playlist, onClose }) => {
    const dispatch = useDispatch();
    const [validationError, setValidationError] = useState('');
    const queue = useSelector(state => state.queue);

    const handleDeletebtn = async (e) => {
        e.stopPropagation();
        setValidationError('');

        const response = await dispatch(playlistAction.deletePlaylist(playlist.id))
            .catch(async (err) => {
                return setValidationError(err[0]);
            });
        if (response) {
            if (playlist.id === queue.listId) {
                dispatch(queueAction.updateList({list: []}))
            }
            onClose();
        }
    };

    const handleClosebtn = (e) => {
        e.stopPropagation();
        onClose();
    };

    return (
        <>
        <div class="title-bar inactive">
        <div class="title-bar-text">Delete</div>
        <div class="title-bar-controls">
        <div className='deleteplaylist-container'>
            <div className='deleteplaylist-btncontainer'>
                <button className='deleteplaylist-btn-close' onClick={handleClosebtn}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className='deleteplaylist-content'>
                <div className='deleteplaylist-head'>
                    <h1>Are you sure you want to delete "{playlist.name}"?</h1>
                </div>
                <div className='deleteplaylist-reminder delete-content'>
                    <p>The list will be gone forever! ☹️ </p>
                </div>
                {validationError &&
                    <div>
                        {validationError}
                    </div>
                }
                <div className='deleteplaylist-btn-container delete-content'>
                    <button className='deleteplaylist-btn-delete' onClick={handleDeletebtn}>Delete {playlist.name}</button>
                </div>
            </div>
        </div>
        </div>
        </div>
        </>
    );
}

export default DeletePlaylistForm;
