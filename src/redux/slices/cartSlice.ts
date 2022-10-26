import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {TCartItem} from '../../components/CartItem'
import { RootState } from "../store";

type CartItem = {
  totalPrice: number,
  item: TCartItem[];
}

const initialState: CartItem = {
  totalPrice: 0,
  item: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.item.find((obj) => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size);

      if (findItem) {
        findItem.count++;
      } else {
        state.item.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.item.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    removeItem(state, action: PayloadAction<TCartItem>) {
      state.item = state.item.filter((obj) => {        
        return !(obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size); 
      });
      state.totalPrice = state.item.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    clearItems(state) {
      state.item = [];
      state.totalPrice = 0;
    },
    minusPizza(state, action: PayloadAction<TCartItem>) {
      const findItem = state.item.find((obj) => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size);
      if (findItem && findItem.count > 1) {
        findItem.count--;
      }

      state.totalPrice = state.item.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    }
  },
});

export const { addItem, removeItem, clearItems, minusPizza } =
  cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectotCartById = (id: string) => (state: RootState) => state.cart.item.filter(obj => obj.id === id);

export default cartSlice.reducer;
