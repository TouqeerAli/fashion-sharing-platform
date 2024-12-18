// src/Redux/Admin/adminReducer.js

import {
  FETCH_RENT_OUT_PRODUCTS_REQUEST,
  FETCH_RENT_OUT_PRODUCTS_SUCCESS,
  FETCH_RENT_OUT_PRODUCTS_FAILURE,
  APPROVE_RENT_OUT_PRODUCT_REQUEST,
  APPROVE_RENT_OUT_PRODUCT_SUCCESS,
  APPROVE_RENT_OUT_PRODUCT_FAILURE,
  REJECT_RENT_OUT_PRODUCT_REQUEST,
  REJECT_RENT_OUT_PRODUCT_SUCCESS,
  REJECT_RENT_OUT_PRODUCT_FAILURE,
  FETCH_RENTOUT_PRODUCT_DETAIL_REQUEST,
  FETCH_RENTOUT_PRODUCT_DETAIL_SUCCESS,
  FETCH_RENTOUT_PRODUCT_DETAIL_FAILURE,
  APPROVE_RENTOUT_PRODUCT_SUCCESS,
  REJECT_RENTOUT_PRODUCT_SUCCESS,
  ADD_SIZE_REQUEST,
  ADD_SIZE_SUCCESS,
  ADD_SIZE_FAILURE,
  UPDATE_SIZE_REQUEST,
  UPDATE_SIZE_SUCCESS,
  UPDATE_SIZE_FAILURE,
} from './ActionType';

const initialState = {
  loading: false,
  rentOutProducts: [],
  rentOutProduct: null,
  error: null,
  approvalStatus: null,
  success: false,
};

const adminRentOutReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RENT_OUT_PRODUCTS_REQUEST:
    case APPROVE_RENT_OUT_PRODUCT_REQUEST:
    case REJECT_RENT_OUT_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case FETCH_RENT_OUT_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        rentOutProducts: action.payload.requests,
        totalPages: action.payload.totalPages,
      };

    case APPROVE_RENT_OUT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        approvalStatus: 'approved',
      };

    case REJECT_RENT_OUT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        approvalStatus: 'rejected',
      };

    case FETCH_RENT_OUT_PRODUCTS_FAILURE:
    case APPROVE_RENT_OUT_PRODUCT_FAILURE:
    case REJECT_RENT_OUT_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case FETCH_RENTOUT_PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true, statusUpdated: false };

    case FETCH_RENTOUT_PRODUCT_DETAIL_SUCCESS:
      return { ...state, loading: false, rentOutProduct: action.payload };

    case FETCH_RENTOUT_PRODUCT_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case APPROVE_RENTOUT_PRODUCT_SUCCESS:
      return {
        ...state,
        rentOutProduct: { ...state.rentOutProduct, status: 'approved' },
        statusUpdated: true,
      };

    case REJECT_RENTOUT_PRODUCT_SUCCESS:
      return {
        ...state,
        rentOutProduct: { ...state.rentOutProduct, status: 'rejected' },
        statusUpdated: true,
      };

      case ADD_SIZE_REQUEST:
        case UPDATE_SIZE_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case ADD_SIZE_SUCCESS:
        case UPDATE_SIZE_SUCCESS:
          return {

            ...state,
            loading: false,
            rentOutProduct: action.payload,
            // rentOutProduct: {
            //   ...state.rentOutProduct,
            //   size: action.payload,
            // },
            success: true,
            error: null,
          };
        case ADD_SIZE_FAILURE:
        case UPDATE_SIZE_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };


    default:
      return state;
  }
};

export default adminRentOutReducer;
