export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESS = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const USER_EXISTS = 'USER_EXISTS';

export interface AuthState {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
}
