import { createAsyncThunk } from "@reduxjs/toolkit"
import type { RegisterPayloadType, LoginPayloadType, AuthResponse} from "../../TypeScript-types/redux-types/auth/operationsType"
import { handleAuthError } from "../../customHooks/errorAuthHook"
import axios from "axios"
import type { AuthState } from "../../TypeScript-types/many-used-types/redux-auth/userAndAuthState"

axios.defaults.baseURL = 'https://connections-api.goit.global/'


const axiosAuth = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const cancelAuth = () => {
    axios.defaults.headers.common.Authorization = ''
}


export const register = createAsyncThunk<AuthResponse, RegisterPayloadType, {rejectValue: string}>(
    `auth/register`, 
    async (payload, thunkApi) => {
        try {
            const response = await axios.post<AuthResponse>('/users/signup', payload)
            axiosAuth(response.data.token)
            return response.data
        }
        catch (error: unknown) {
                  return thunkApi.rejectWithValue(handleAuthError(error))
        }
    }
)

export const login = createAsyncThunk<AuthResponse, LoginPayloadType, {rejectValue: string}>(
    'auth/login',
    async (payload, thunkApi) =>
    {
        try {
            const response = await axios.post<AuthResponse>('/users/login', payload)
            axiosAuth(response.data.token)
            return response.data
        }
            catch (error: unknown) {
               return thunkApi.rejectWithValue(handleAuthError(error))
    }
    }

)

export const logOut = createAsyncThunk<void, void, {rejectValue: string}>(
    'auth/logout',
    async (_, thunkApi) => {
        try {
             await axios.post('/users/logout')
            cancelAuth() 
        }
        catch(error: unknown) {
            return thunkApi.rejectWithValue(handleAuthError(error))
        }
    }
)


export const refresh = createAsyncThunk<AuthResponse["user"], void, { state: { auth: AuthState }; rejectValue: string}>(
    'auth/refresh',
    async (_, thunkApi) => {
        const state = thunkApi.getState()
        const refresh = state.auth.token
        if (refresh === null) {
            return thunkApi.rejectWithValue("cant find token")
        }
        try {
            axiosAuth(refresh)
            const response = await axios.get<AuthResponse["user"]>('/users/current')
            return response.data
        }
        catch (error: unknown){
             return thunkApi.rejectWithValue(handleAuthError(error))
        }
    }
)