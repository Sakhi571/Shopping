import { createSlice } from "@reduxjs/toolkit";
const initialState  = [];
const Slice = createSlice({
    name:'cart',
    initialState,
    reducers:
    {
        addItem(state, action){
         const {id}= action.payload;
         const existing = state.find(item => item.id === id);
         if(existing){
            existing.quantity +=1;
         }
         else{
            state.push ({...action.payload, quantity : 1})
         }
        },
        addCard(state, action){
            const item = state.find(item => item.id === action.payload.id);
            if (item){
                item.quantity += 1;
            }
        },
        removeCard(state, action){
            const item = state.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity -= 1;
            }
        },
        removeItem(state, action){
         return  state.filter(item => item.id !== action.payload.id)
        },
        removeAll(state){
            return  [];
        }
    },
});
export const {addItem, addCard, removeCard, removeItem, removeAll} = Slice.actions;
export default Slice.reducer;