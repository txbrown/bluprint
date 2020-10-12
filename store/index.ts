import {
  applyMiddleware,
  combineReducers,
  createStore,
  DeepPartial
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import application from './application/reducer';
import auth from './auth/reducer';
import favourites from './favourites/reducer';
import { AppState } from './types';

const reducers = { auth, application, favourites };

const appReducer = combineReducers(reducers);

export default (initialState?: DeepPartial<AppState>) =>
  createStore(appReducer, initialState, applyMiddleware(thunkMiddleware));
