import { Navigate } from "react-router-dom"
import { isloggedSelector } from "../redux/auth/authSelectors"
import { useAppSelector } from "../TypeScript-types/redux-types/hookis"
import React from "react"
import type { RoutePropsTypes } from "../TypeScript-types/many-used-types/redux-auth/RedirectsTypes"


export const RedirectRoute: React.FC<RoutePropsTypes> = ({ component: Component, path = "contact" } ) => {
    const isLogged = useAppSelector(isloggedSelector)
    return isLogged ? <Navigate to={path}/> : <Component/>
} 