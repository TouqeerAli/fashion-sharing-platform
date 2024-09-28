// actions.js
import * as types from './ActionType';

import api, { API_BASE_URL } from "../../../config/api";

// User Info Actions
export const fetchUserInfoRequest = () => ({
  type: types.FETCH_USER_INFO_REQUEST
});

export const fetchUserInfoSuccess = (userInfo) => ({
  type: types.FETCH_USER_INFO_SUCCESS,
  payload: userInfo
});

export const fetchUserInfoFailure = (error) => ({
  type: types.FETCH_USER_INFO_FAILURE,
  payload: error
});

export const fetchUserInfo = () => {
  return async (dispatch) => {
    dispatch(fetchUserInfoRequest());
    try {
      // Replace with your actual API call
      const response = await fetch(`${API_BASE_URL}/api/users/loggedin-profile`);
      const data = await response.json();
      dispatch(fetchUserInfoSuccess(data));
    } catch (error) {
      dispatch(fetchUserInfoFailure(error.message));
    }
  };
};

// Rent Outs Actions
export const fetchRentOutsRequest = () => ({
  type: types.FETCH_RENT_OUTS_REQUEST
});

export const fetchRentOutsSuccess = (rentOuts) => ({
  type: types.FETCH_RENT_OUTS_SUCCESS,
  payload: rentOuts
});

export const fetchRentOutsFailure = (error) => ({
  type: types.FETCH_RENT_OUTS_FAILURE,
  payload: error
});

export const fetchRentOuts = () => {
  return async (dispatch) => {
    dispatch(fetchRentOutsRequest());
    try {
      // Replace with your actual API call
      const response = await fetch(`${API_BASE_URL}/api/my-rentouts`);
      const data = await response.json();
      dispatch(fetchRentOutsSuccess(data));
    } catch (error) {
      dispatch(fetchRentOutsFailure(error.message));
    }
  };
};

// Set Active Tab Action
export const setActiveTab = (tab) => ({
  type: types.SET_ACTIVE_TAB,
  payload: tab
});