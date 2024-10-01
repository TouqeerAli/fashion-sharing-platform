// actions.js
import * as types from './ActionType';

import api, { API_BASE_URL } from "../../../config/api";

api.defaults.headers.post['Content-Type'] = 'application/json';

// User Info Actions
const fetchUserInfoRequest = () => ({
  type: types.FETCH_USER_INFO_REQUEST
});

const fetchUserInfoSuccess = (userInfo) => ({
  type: types.FETCH_USER_INFO_SUCCESS,
  payload: userInfo
});

const fetchUserInfoFailure = (error) => ({
  type: types.FETCH_USER_INFO_FAILURE,
  payload: error
});

export const fetchUserInfo = () => async (dispatch, getState) => {
  dispatch(fetchUserInfoRequest());
  const { auth } = getState();
  const token = auth?.jwt || localStorage.getItem("jwt");
  try {
    const response = await api.get(`${API_BASE_URL}/api/users/loggedin-profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("User Profile : ", response.data);
    dispatch(fetchUserInfoSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserInfoFailure(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    ));
  }
};

// Rent Outs Actions
const fetchRentOutsRequest = () => ({
  type: types.FETCH_RENT_OUTS_REQUEST
});

const fetchRentOutsSuccess = (rentOuts) => ({
  type: types.FETCH_RENT_OUTS_SUCCESS,
  payload: {
    requests: rentOuts.content,
    totalPages: rentOuts.totalPages,
  }
  
  
});

const fetchRentOutsFailure = (error) => ({
  type: types.FETCH_RENT_OUTS_FAILURE,
  payload: error
});

export const fetchRentOuts = (page, size = 10, status = "", dateOrder = "") => async (dispatch, getState) => {
  dispatch(fetchRentOutsRequest());
  console.log("Date Order :",dateOrder)
  const { auth } = getState();
  const token = auth?.jwt || localStorage.getItem("jwt");
  try {
     // Build the query parameters string based on the filters
     let queryParams = `?page=${page}&size=${size}`;

     // Append status filter if selected
     if (status) {
       queryParams += `&status=${status}`;
     }
 
     // Append date sorting if selected
     if (dateOrder) {
       queryParams += `&sortOrder=${dateOrder}`;
     }
    const response = await api.get(`${API_BASE_URL}/api/rentout/my-rentouts${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch(fetchRentOutsSuccess(response.data));
  } catch (error) {
    dispatch(fetchRentOutsFailure(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    ));
  }
};

// Set Active Tab Action
export const setActiveTab = (tab) => ({
  type: types.SET_ACTIVE_TAB,
  payload: tab
});


// export const fetchRentOutDetails = (itemId) => async (dispatch) => {
//   console.log("From fetchRentOutDetails Id:",itemId)
//   try {
//     dispatch({ type: types.FETCH_RENTOUT_DETAIL_REQUEST });
//     const response = await api.get(`/api/rentout/${itemId}`); // Assuming your backend API route
    
//     dispatch({
//       type: types.FETCH_RENTOUT_DETAIL_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: types.FETCH_RENTOUT_DETAIL_FAILURE,
//       payload: error.response?.data?.message || 'Error fetching product details',
//     });
//   }
// };

export const fetchRentOutDetailsRequest = () => ({
  type: types.FETCH_RENT_OUT_DETAILS_REQUEST
});

export const fetchRentOutDetailsSuccess = (data) => ({
  type: types.FETCH_RENT_OUT_DETAILS_SUCCESS,
  payload: data
});

export const fetchRentOutDetailsFailure = (error) => ({
  type: types.FETCH_RENT_OUT_DETAILS_FAILURE,
  payload: error
});

// Async Action
export const fetchRentOutDetails = (id) => async (dispatch, getState) => {
  dispatch(fetchRentOutDetailsRequest());
  
  const { auth } = getState();
  const token = auth?.jwt || localStorage.getItem("jwt");
  
  try {
    const response = await api.get(`${API_BASE_URL}/api/rentout/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch(fetchRentOutDetailsSuccess(response.data));
  } catch (error) {
    dispatch(fetchRentOutDetailsFailure(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    ));
  }
};
