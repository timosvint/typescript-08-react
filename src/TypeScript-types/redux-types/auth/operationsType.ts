import type { User, AuthState } from "../../many-used-types/redux-auth/userAndAuthState";

export interface AuthResponse {
    user: User
    token: string
}

export interface LoginPayloadType {
    email: string
    password: string
}

export interface RegisterPayloadType{
    name: string
    email: string
    password: string

}


export interface RefreshType{
    state: AuthState,
}