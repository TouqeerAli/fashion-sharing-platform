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
  ADD_SIZE_REQUEST,
  ADD_SIZE_SUCCESS,
  ADD_SIZE_FAILURE,
  UPDATE_SIZE_REQUEST,
  UPDATE_SIZE_SUCCESS,
  UPDATE_SIZE_FAILURE,
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

// Fetch rent out product detail action
export const fetchRentOutProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_RENTOUT_PRODUCT_DETAIL_REQUEST });
    const response = await api.get(`/api/admin/rentout/${id}`); // Assuming your backend API route
    console.log("hello",response.data);
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

// Approve rent-out product
export const  approveRentOutProduct = (productId) => async (dispatch) => {
  dispatch({ type: APPROVE_RENT_OUT_PRODUCT_REQUEST });
  try {
    const response = await api.put(`/api/admin/rentout/updateStatus/${productId}?status=Approved`);
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
    const response = await api.put(`/api/admin/rentout/updateStatus/${productId}?status=Rejected`);
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






// Fetch rent-out requests with pagination
export const fetchRentOutRequests = (page, size = 10, status = "", dateOrder = "") => async (dispatch) => {
  dispatch({ type: FETCH_RENT_OUT_PRODUCTS_REQUEST });

  try {
    // Build the query parameters string based on the filters
    let queryParams = `?page=${page}&size=${size}`;

    // Append status filter if selected
    if (status) {
      queryParams += `&status=${status}`;
    }

    // Append date sorting if selected
    if (dateOrder) {
      queryParams += `&sort=${dateOrder}`;
    }

    // Make the API call with the query parameters
    const response = await api.get(`/api/admin/rentout/rentOutRequests${queryParams}`);
   
    console.log("data"+JSON.stringify(response.data.content));

    dispatch({
      type: FETCH_RENT_OUT_PRODUCTS_SUCCESS,
      payload: {
        requests: response.data.content, // Update this line
        totalPages: response.data.totalPages,
      } // Adjust response structure if necessary
    });
  } catch (error) {
    dispatch({
      type: FETCH_RENT_OUT_PRODUCTS_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};


// Add Size to a Product
export const addSize = (id, sizeData) => async (dispatch) => {
  dispatch({ type: ADD_SIZE_REQUEST });
  try {
    const response = await api.put(`/api/rentout/product/${id}/size`, sizeData);
    dispatch({
      type: ADD_SIZE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_SIZE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

// Update Size of a Product
export const updateSize = (id, sizeData) => async (dispatch) => {
  dispatch({ type: UPDATE_SIZE_REQUEST });
  try {
    const response = await api.put(`/api/admin/rentout/updateSize/${id}`, sizeData);
    dispatch({
      type: UPDATE_SIZE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SIZE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

// export const fetchRentOutProducts = (page) => async (dispatch) => {
//   dispatch({ type: FETCH_RENT_OUT_PRODUCTS_REQUEST });
//   try {
//     const response = await api.get(`/api/admin/rentout/all`);

//     const data = response.data;
//     console.log("RentOut Products ",data)
//     dispatch({
//       type: FETCH_RENT_OUT_PRODUCTS_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: FETCH_RENT_OUT_PRODUCTS_FAILURE,
//       payload: error.message,
//     });
//   }
// };
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