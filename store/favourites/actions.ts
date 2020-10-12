import placesService from '../../services/placesService';
import { GET_FAVOURITES_COMPLETED, GET_FAVOURITES_FAILED } from './types';

export function getFavourites(userId: string) {
  return async dispatch => {
    try {
      const favourites = await placesService.getUserFavourites(userId);

      return dispatch({
        type: GET_FAVOURITES_COMPLETED,
        payload: { favourites }
      });
    } catch (error) {
      return dispatch({ type: GET_FAVOURITES_FAILED });
    }
  };
}
