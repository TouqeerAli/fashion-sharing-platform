import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from "redux-thunk";
import authReducer from "./Auth/Reducer";
import customerProductReducer from "./Customers/Product/Reducer";
import productReducer from "./Admin/Product/Reducer";
import cartReducer from "./Customers/Cart/Reducer";
import { orderReducer } from "./Customers/Order/Reducer";
import adminOrderReducer from "./Admin/Orders/Reducer";
import ReviewReducer from "./Customers/Review/Reducer";
import rentOutReducer from './Customers/RentOut/Reducer';
import adminRentOutReducer from "./Admin/RentOut/Reducer";





const rootReducers=combineReducers({

    auth:authReducer,
    customersProduct:customerProductReducer,
    cart:cartReducer,
    order:orderReducer,
    review:ReviewReducer,
   
    rentOut: rentOutReducer,

    // admin
    adminsProduct:productReducer,
    adminsOrder:adminOrderReducer,
    adminsRentOut: adminRentOutReducer,


});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))