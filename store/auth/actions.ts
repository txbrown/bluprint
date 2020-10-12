import * as types from './types';

export function loginSuccess() {
  return { type: types.LOGIN_SUCCESS };
}

export function logout() {
  return { type: types.LOGOUT };
}
