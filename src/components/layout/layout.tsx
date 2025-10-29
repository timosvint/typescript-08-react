import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LoginTrue } from "../loginTrue/LoginTrue";
import { useAppSelector } from "../../TypeScript-types/redux-types/hookis";
import { isloggedSelector } from "../../redux/auth/authSelectors";
import clsx from "clsx"


export const AppBar = () => {
       const isLogged = useAppSelector(isloggedSelector)

    return (
        <>
            <header>
                <div>
                    <ul>
                        <li>
                            <NavLink to="./">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                        {isLogged ? <LoginTrue /> : (
                            <>
                         <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Register</NavLink>
                                </li>
                          </>
                        )  }
                    </ul>
                </div>

            </header>
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>    
            </main>
        </>
    )
} 