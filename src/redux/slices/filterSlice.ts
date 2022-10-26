import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

type FilterSliceState = {
  categoryId: number,
  sort: ISort,
  search: string,
}

export interface ISort {
  name: string,
  property: 'rating' | 'title' | 'price',
  direct?: "asc" | "desc"
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: 'популятности',
    property: 'rating'
  },
  search: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSortProperty(state, action: PayloadAction<ISort>){
      state.sort = action.payload;
      
    },
    setSearch(state, action: PayloadAction<string>){
      state.search = action.payload;
    }
  }
})

export const { setCategoryId, setSortProperty, setSearch } = filterSlice.actions;

export const selectorFilter = (state: RootState) => state.filter

export const selectSort = (state: RootState) => state.filter.sort;
export default filterSlice.reducer;