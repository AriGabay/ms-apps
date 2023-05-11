export const FETCH_PHOTOS_REQUEST = 'FETCH_PHOTOS_REQUEST';
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_IS_LOADING = 'SET_IS_LOADING';

export const fetchPhotosRequest = () => {
  return { type: FETCH_PHOTOS_REQUEST };
};

export const fetchPhotosSuccess = (photos) => {
  return { type: FETCH_PHOTOS_SUCCESS, payload: photos };
};

export const fetchPhotosFailure = (error) => {
  return { type: FETCH_PHOTOS_FAILURE, payload: error };
};

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: currentPage,
  };
};

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    payload: category,
  };
};
export const setSortBy = (sortBy) => {
  return {
    type: SET_SORT_BY,
    payload: sortBy,
  };
};
export const setIsLoading = (lodaing) => {
  return {
    type: SET_IS_LOADING,
    payload: lodaing,
  };
};
