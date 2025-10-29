import type { User } from "../../TypeScript-types/many-used-types/redux-auth/userAndAuthState";
import type { RootState } from "../storage";

export const userSelector = (state: RootState): User => state.auth.user
export const isloggedSelector = (state: RootState): boolean => state.auth.isLoggedIn
export const isRefreshingSelector = (state: RootState): boolean => state.auth.isRefreshing
export const tokenSelector = (state: RootState): string | null => state.auth.token 