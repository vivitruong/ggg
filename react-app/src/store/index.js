import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import playlistReducer from './playlist';
import songReducer from './song';
import userSongReducer from './userSong';
import queueReducer from './queue';
import { playSongSliceRducer, songsSliceReducer } from './slices/playlistSlice';


const rootReducer = combineReducers({
  session,
  userPlaylists: playlistReducer,
  songs: songReducer,
  userSongs: userSongReducer,
  queue: queueReducer,
  playlistSongs: songsSliceReducer,
  playSong: playSongSliceRducer,

});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
