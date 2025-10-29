import { createSlice } from "@reduxjs/toolkit";
import { login, logOut, refresh, register } from "./operations";
import type { AuthState } from "../../TypeScript-types/many-used-types/redux-auth/userAndAuthState";


const initialState: AuthState  = {
           user: {
         name: null,
         email: null,
       },
       token: null,
       isLoggedIn: false,
       isRefreshing: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn = true;
        })    
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        })
        .addCase(logOut.fulfilled, (state) => {
            state.user = { name: null, email: null, }
            state.token = null
            state.isLoggedIn = false
        })
        .addCase(refresh.pending, (state) => {
            state.isRefreshing = true
        })
        .addCase(refresh.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
            state.isRefreshing = false
        })
        .addCase(refresh.rejected, (state) => {
            state.isRefreshing = false
        })
    }

})


export const authSliceCounter = authSlice.reducer