// src/Redux/Admin/adminActions.js

import axios from 'axios';
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
} from './ActionType';
import api from "../../../config/api";

export const fetchRentOutProducts = (page) => async (dispatch) => {
  dispatch({ type: FETCH_RENT_OUT_PRODUCTS_REQUEST });
  try {
    const response = await api.get(`/api/admin/rentout/all`);

    const data = response.data;
    console.log("RentOut Products ",data)
    dispatch({
      type: FETCH_RENT_OUT_PRODUCTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_RENT_OUT_PRODUCTS_FAILURE,
      payload: error.message,
    });
  }
};

// Approve rent-out product
export const approveRentOutProduct = (productId) => async (dispatch) => {
  dispatch({ type: APPROVE_RENT_OUT_PRODUCT_REQUEST });
  try {
    const response = await axios.put(`/api/admin/rentout/updateStatus/${productId}`);
    dispatch({
      type: APPROVE_RENT_OUT_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: APPROVE_RENT_OUT_PRODUCT_FAILURE,
      payload: error.message,
    });
  }
};

// Reject rent-out product
export const rejectRentOutProduct = (productId) => async (dispatch) => {
  dispatch({ type: REJECT_RENT_OUT_PRODUCT_REQUEST });
  try {
    const response = await axios.put(`/api/admin/rent-out/${productId}/reject`);
    dispatch({
      type: REJECT_RENT_OUT_PRODUCT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: REJECT_RENT_OUT_PRODUCT_FAILURE,
      payload: error.message,
    });
  }
};


// Fetch rent out product detail action
export const fetchRentOutProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_RENTOUT_PRODUCT_DETAIL_REQUEST });
    const response = await api.get(`/api/admin/rentout/${id}`); // Assuming your backend API route
    dispatch({
      type: FETCH_RENTOUT_PRODUCT_DETAIL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_RENTOUT_PRODUCT_DETAIL_FAILURE,
      payload: error.response?.data?.message || 'Error fetching product details',
    });
  }
};

// // Approve rent out product action
// export const approveRentOutProduct = (id) => async (dispatch) => {
//   try {
//     await axios.post(`/api/rentout/products/${id}/approve`); // Assuming your backend API route
//     dispatch({ type: APPROVE_RENTOUT_PRODUCT_SUCCESS, payload: id });
//   } catch (error) {
//     console.error('Error approving product:', error);
//   }
// };

// // Reject rent out product action
// export const rejectRentOutProduct = (id) => async (dispatch) => {
//   try {
//     await axios.post(`/api/rentout/products/${id}/reject`); // Assuming your backend API route
//     dispatch({ type: REJECT_RENTOUT_PRODUCT_SUCCESS, payload: id });
//   } catch (error) {
//     console.error('Error rejecting product:', error);
//   }
// };