import Immutable from 'seamless-immutable';
import { AuthState, LOGIN_SUCCESS, LOGOUT } from './types';

const initialState: AuthState = Immutable({
  isLoggedIn: false,
  firstName: 'John',
  lastName: 'Doe'
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return Immutable.merge(state, {
        isLoggedIn: true
      });
    }

    case LOGOUT: {
      return Immutable.merge(state, {
        isLoggedIn: false
      });
    }

    default:
      break;
  }
  return state;
}
