import {
  FETCH_PHOTOS_REQUEST,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_FAILURE,
  SET_CATEGORY,
  SET_CURRENT_PAGE,
  SET_SORT_BY,
  SET_IS_LOADING,
} from '../actions/photoActions';

const initialState = {
  loading: false,
  photos: [],
  error: null,
  currentPage: 0,
  category: 'sport',
  sortBy: null,
};

const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        photos: action.payload,
        error: null,
      };
    case FETCH_PHOTOS_FAILURE:
      return {
        ...state,
        loading: false,
        photos: [],
        error: action.payload,
      };
    case SET_CATEGORY:
      return {
        ...state,
        lcategory: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default photosReducer;
