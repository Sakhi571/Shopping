import { configureStore } from "@reduxjs/toolkit";
import cardReducer from '../redux/Slice';
const Store = configureStore({
    reducer:{
        cart: cardReducer,
    },
});
export default Store;