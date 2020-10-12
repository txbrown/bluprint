export const GET_FAVOURITES_COMPLETED = 'GET_FAVOURITES_COMPLETED';
export const GET_FAVOURITES_FAILED = 'GET_FAVOURITES_FAILED';

export interface Favourite {
  id: string;
  user_id: string;
  place_id: string;
}

export interface FavouritesState {
  favourites: Favourite[];
}
