import api, { API_BASE_URL } from "../../../config/api";
import { 
    RENT_OUT_ITEM_REQUEST, 
    RENT_OUT_ITEM_SUCCESS, 
    RENT_OUT_ITEM_FAILURE 
} from './ActionType';

// Action Creators
const rentOutItemRequest = () => ({
    type: RENT_OUT_ITEM_REQUEST,
});

const rentOutItemSuccess = (data) => ({
    type: RENT_OUT_ITEM_SUCCESS,
    payload: data,
});

const rentOutItemFailure = (error) => ({
    type: RENT_OUT_ITEM_FAILURE,
    payload: error,
});

// Thunk Action for handling API call with error handling
export const submitRentOutItem = (formData) => async (dispatch) => {
    console.log("Api calls")    
    dispatch(rentOutItemRequest()); // Dispatch request action
    try {
       // const response = await submitRentOutApi(formData); // Call the API to submit the rent-out form
        const { response } = await api.post(
            `${API_BASE_URL}/api/rentout/`,
            formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Required for file uploads
                },
            }
        );
        dispatch(rentOutItemSuccess(response.data)); // Dispatch success action if API call succeeds
    } catch (error) {
        dispatch(rentOutItemFailure(
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )); // Dispatch failure action if API call fails, with proper error message
    }
};
