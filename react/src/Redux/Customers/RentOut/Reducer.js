import { 
    RENT_OUT_ITEM_REQUEST, 
    RENT_OUT_ITEM_SUCCESS, 
    RENT_OUT_ITEM_FAILURE 
} from './ActionType';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const rentOutReducer = (state = initialState, action) => {
    switch (action.type) {
        case RENT_OUT_ITEM_REQUEST:
            return { ...state, loading: true, error: null };
        case RENT_OUT_ITEM_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case RENT_OUT_ITEM_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default rentOutReducer;
