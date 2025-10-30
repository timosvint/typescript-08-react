
import type React from "react"
import { isloggedSelector } from "../redux/auth/authSelectors"
import { useAppSelector } from "../TypeScript-types/redux-types/hookis"
import { Navigate } from "react-router-dom"
import type { RoutePropsTypes  } from "../TypeScript-types/many-used-types/redux-auth/RedirectsTypes"



export const RoutePrivate: React.FC<RoutePropsTypes > = ({ component: Component,  path = "/login"}) => {
    const isLogged =  useAppSelector(isloggedSelector)
     return isLogged ? <Component/> : <Navigate to={path} />
}