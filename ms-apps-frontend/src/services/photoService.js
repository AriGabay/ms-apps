import axios from 'axios';
import {
  FETCH_PHOTOS_FAILURE,
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  SET_IS_LOADING,
} from '../actions/photoActions';

const HOST = process.env.REACT_APP_API_HOST + 'photos/';

const fetchPhotosRequest = () => {
  return { type: FETCH_PHOTOS_REQUEST };
};

const fetchPhotosSuccess = (photos) => {
  return { type: FETCH_PHOTOS_SUCCESS, payload: photos };
};

const fetchPhotosFailure = (error) => {
  return { type: FETCH_PHOTOS_FAILURE, payload: error };
};
const isLoading = (isLoading) => {
  return { type: SET_IS_LOADING, payload: isLoading };
};

export const fetchPhotos = (category, currentPage, sort) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(fetchPhotosRequest());
    try {
      const response = await axios.get(
        `${HOST}?category=${category}&page=${currentPage}&sort=${sort}`
      );
      dispatch(fetchPhotosSuccess(response.data));
      dispatch(isLoading(false));
    } catch (error) {
      console.error('Error fetching photos', error);
      dispatch(fetchPhotosFailure(error));
      dispatch(isLoading(false));
    }
  };
};
