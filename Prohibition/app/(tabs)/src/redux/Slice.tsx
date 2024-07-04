import { createSlice } from "@reduxjs/toolkit";
const initialState  = [];
const Slice = createSlice({
    name:'cart',
    initialState,
    reducers:
    {
        addItem(state, action){
            state.push(action.payload);
        },
        addCard(state, action){
            const item = state.find(item => item.id === action.payload.id);
            if (item){
                item.quantity += 1;
            }
        },
        removeCard(state, action){
            const item = state.find(item => item.id === action.payload.id);
            if (item ){
                item.quantity -= 1;
            }
        }
    },
});
export const {addItem, addCard, removeCard} = Slice.actions;
export default Slice.reducer;