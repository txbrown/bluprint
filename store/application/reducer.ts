import Immutable from 'seamless-immutable';
import { ApplicationState, SHOW_ERROR } from './types';

const initialState: ApplicationState = Immutable({
    showError: false
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_ERROR: {
      return Immutable.merge(state, {
        showError: true
      });
    }

    // case LOGOUT: {
    //   return Immutable.merge(state, {
    //     isLoggedIn: false
    //   });
    // }

    default:
      break;
  }
  return state;
}
