import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface init {
    name: string
}

const initialState: init = {
    name: "",
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        onFilter(state, action: PayloadAction<string>) {
            state.name = action.payload
        }
    }
})




export const { onFilter } = filterSlice.actions;
export default filterSlice.reducer

