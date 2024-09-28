// reducer.js
import * as types from './ActionType';

const initialState = {
  activeTab: 'userInfo',
  userInfo: null,
  rentOuts: [],
  loading: false,
  error: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_INFO_REQUEST:
    case types.FETCH_RENT_OUTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case types.FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload
      };
    
    case types.FETCH_RENT_OUTS_SUCCESS:
      return {
        ...state,
        loading: false,
        rentOuts: action.payload
      };
    
    case types.FETCH_USER_INFO_FAILURE:
    case types.FETCH_RENT_OUTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case types.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload
      };
    
    default:
      return state;
  }
};

export default profileReducer;