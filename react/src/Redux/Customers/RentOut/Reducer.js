import {
    FETCH_RENT_OUT_PRODUCTS_REQUEST,
    FETCH_RENT_OUT_PRODUCTS_SUCCESS,
    FETCH_RENT_OUT_PRODUCTS_FAILURE,
  } from './ActionType';
  
  const initialState = {
    loading: false,
    rentOutProducts: null,
    error: null,
    totalPages: 0,
  };
  
  const adminRentOutReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RENT_OUT_PRODUCTS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_RENT_OUT_PRODUCTS_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          rentOutProducts: action.payload.content,
          totalPages: action.payload.totalPages 
        };
      case FETCH_RENT_OUT_PRODUCTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default adminRentOutReducer;
  