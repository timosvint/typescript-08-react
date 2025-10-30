import { createSlice } from "@reduxjs/toolkit";





const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isOpen: false,
        contentId: null,
        patch: false,
    },
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true
            state.contentId = action.payload
            state.patch = false
        },
        openPatch: (state, action) => {
            state.isOpen = true
            state.contentId = action.payload
            state.patch = true
        },
        closeModal: (state) => {
            state.isOpen = false
            state.contentId = null
            state.patch = false
        }
    }


})




export const { openModal, closeModal, openPatch } = modalSlice.actions;
export default modalSlice.reducer;