import Immutable from 'seamless-immutable';
import {
  FavouritesState,
  GET_FAVOURITES_COMPLETED,
  GET_FAVOURITES_FAILED
} from './types';

const initialState: FavouritesState = Immutable({
  favourites: []
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case GET_FAVOURITES_COMPLETED: {
      return Immutable.merge(state, {
        favourites: action.payload.favourites
      });
    }

    case GET_FAVOURITES_FAILED: {
      return Immutable.merge(state, {
        favourites: null
      });
    }

    default:
      break;
  }
  return state;
}
