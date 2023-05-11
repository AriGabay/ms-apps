import axios from 'axios';
import {
  FETCH_PHOTOS_FAILURE,
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  SET_IS_LOADING,
} from '../actions/photoActions';

// action creators
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

// the fetchPhotosByPage thunk
export const fetchPhotosByPage = (category, currentPage, sort) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(fetchPhotosRequest());

    try {
      const response = await axios.get(
        `http://localhost:3000/api/photos/page?category=${category}&page=${currentPage}&sort=${sort}`
      );
      console.log('response', response);

      dispatch(fetchPhotosSuccess(response.data));
      dispatch(isLoading(false));
    } catch (error) {
      console.error('Error fetching photos', error);
      dispatch(fetchPhotosFailure(error));
      dispatch(isLoading(false));
    }
  };
};
export const fetchPhotosBySort = (category, sort) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(fetchPhotosRequest());

    try {
      const response = await axios.get(
        `http://localhost:3000/api/photos/sort?category=${category}&sort=${sort}`
      );
      console.log('response', response);
      dispatch(fetchPhotosSuccess(response.data));
      dispatch(isLoading(false));
    } catch (error) {
      console.error('Error fetching photos', error);
      dispatch(fetchPhotosFailure(error));
      dispatch(isLoading(false));
    }
  };
};
