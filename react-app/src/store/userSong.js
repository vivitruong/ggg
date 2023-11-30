const LOAD_USERSONGS = 'songs/loadUserSongs';
const REMOVE_SONG = 'songs/removeSong';
const ADD_SONG = 'songs/addSong';
const UPDATE_SONG = 'song/UPDATE_SONG';


export function loadUserSongs (songs) {
    return {
        type: LOAD_USERSONGS,
        songs
    };
}
export const updateSong = (song) => ({
    type: UPDATE_SONG,
    payload: song
});

export function addSong (song) {
    return {
        type: ADD_SONG,
        payload: song
    };
}


export function removeSong (songId) {
    return {
        type: REMOVE_SONG,
        payload: songId
    };
}

export const fetchUserSongs = () => async dispatch => {
    const response = await fetch(`/api/songs/current`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserSongs(data.songs));
        return response;
    }
};

export const updateASong = (payload, songId) => async dispatch => {
    const response = await fetch(`/api/songs/${songId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const editedSong = await response.json();
        // console.log(editedSong);
        dispatch(updateSong(editedSong));
        return editedSong;
    }
};

export const deleteSong = ({ songId }) => async dispatch => {
    const response = await fetch(`api/songs/${ songId }`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const deletionResponse = await response.json();
        dispatch(removeSong(songId)
        );
        return deletionResponse;
    }
};
export const createSong = (song) => async dispatch => {
    const response = await fetch(`/api/songs/`, {
        method: 'POST',
        body: song
    });

    if (response.ok) {
        const resPost = await response.json();
        dispatch(addSong(resPost));
        return 'Song created'
    } else {
        console.log("There was an error making your post!");
    }


};


const initialState = [];

const userSongReducer = (state = initialState, action) => {
    let newState = [ ...state ];

    switch (action.type) {
        case LOAD_USERSONGS:
            return action.songs || []; // Replace the existing state with the new songs array.

        case ADD_SONG:
            console.log(action.payload);
            if(action.payload) {
                newState.push(action.payload)
            }

            return newState

        case UPDATE_SONG:
            return newState.map((song) => {
                return parseInt(song?.id) === parseInt(action.payload?.id) ? action.payload : song;
            }
            );

        case REMOVE_SONG:
            return newState.filter((song) => parseInt(song?.id) !== parseInt(action.payload));

        default:
            return state;
    }
};




function deepCopy (value) {
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.map(element => deepCopy(element));
        } else {
            const result = {};
            Object.entries(value).forEach(entry => {
                result[ entry[ 0 ] ] = deepCopy(entry[ 1 ]);
            });
            return result;
        }
    } else {
        return value;
    }
}

export default userSongReducer;
