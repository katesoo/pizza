import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TCartItem } from "../../components/CartItem";
import { RootState } from "../store";
import { ISort } from "./filterSlice";

export type TPizzaFetch = {
  categoryId: number, sort: ISort, search: string
}

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasThunck",
  async (params: TPizzaFetch) => {
    const { categoryId, sort, search } = params;
    const { data } = await axios.get(
      `https://62f38e0eb81dba4a0135e14d.mockapi.io/pizzas?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sort.property}&order=${sort.direct}&search=${search? search : ''}`, 
      {
        headers: {"Access-Control-Allow-Origin": "*"} }
    );
    return data as TCartItem[];
  }
);

type TPizzaItemFetch = {
  items: TCartItem[],
  status: "loading" | "success" | "error"
}

const initialState: TPizzaItemFetch = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<TCartItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = "loading";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = "error";
    })
  }
  
});

export const { setItem } = pizzaSlice.actions;

export const selectorPizza = (state: RootState) => state.pizza
export default pizzaSlice.reducer;
