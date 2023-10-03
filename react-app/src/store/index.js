// import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import session from './session'

// const rootReducer = combineReducers({
//   session,
// });


// let enhancer;

// if (process.env.NODE_ENV === 'production') {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = require('redux-logger').default;
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

// const configureStore = (preloadedState) => {
//   return createStore(rootReducer, preloadedState, enhancer);
// };

// export default configureStore;

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice';
import playlistsSliceReducer from '../slices/playlistsSlice';
import { songsSliceReducer, playSongSliceRducer, likedSongSliceRducer } from '../slices/songsSlice';
import session from './session';
import songReducer from './song';
import userSongReducer from './userSong';


// Combine the reducers from both stores
const rootReducer = combineReducers({
  // Your reducers from the first store
  session,
  songs: songReducer,
  userSongs: userSongReducer,

  // Your reducers from the second store
  [ apiSlice.reducerPath ]: apiSlice.reducer,
  playlists: playlistsSliceReducer,
  songs: songsSliceReducer,
  playSong: playSongSliceRducer,
  likedSongs: likedSongSliceRducer,
});

// Create your Redux store using combineReducers
const store = configureStore({
  reducer: rootReducer, // Use the combined rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK-Query middleware
  devTools: true,
});

export default store;
