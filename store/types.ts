import { AuthState } from './auth/types';
import { FavouritesState } from './favourites/types';

export interface AppState {
  auth: AuthState;
  favourites: FavouritesState;
}
