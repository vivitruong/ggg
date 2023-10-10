const LOAD_ALLSONGS = 'songs/loadAll';
const LOAD_ONESONG = 'songs/loadOneSong';

const SEARCH_SONG ='songs/searchSong';
export function loadAllSongs (songs) {
    return {
        type: LOAD_ALLSONGS,
        songs
    };
}

export function searchSong(song){
    return {
        type: SEARCH_SONG,
        payload: song
    }
}

export function loadOneSong(song) {
    return {
        type: LOAD_ONESONG,
        song
    }
}
export const getOneSong = (id) => async(dispatch) => {
    const response = await fetch(`/api/songs/${id}`)

    if(response.ok){
        const song = await response.json()
        dispatch(loadOneSong(song))
        return song
    }
    return response
}

export const fetchAllSongs = () => async dispatch => {
    const response = await fetch(`/api/songs`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllSongs(data.songs));
        return response;
    }
};



const initialState = [];

const songReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_ALLSONGS:
            return action.songs || [];


        case LOAD_ONESONG:
            newState[action.song.id] = {...newState[action.song.id], ...action.song};
            return newState

        default:
            return state;
    }
};



export default songReducer;
