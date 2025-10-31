import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LoginTrue } from "../loginTrue/LoginTrue";
import { useAppSelector } from "../../TypeScript-types/redux-types/hookis";
import { isloggedSelector } from "../../redux/auth/authSelectors";
import clsx from "clsx"
import css from "./layout.module.css"


export const AppBar = () => {
       const isLogged = useAppSelector(isloggedSelector)

    return (
        <>
            <header>
                <div className={css.mainDiv}>
                    <ul className={css.ulLayout}>
                        <div className={css.leftSideLink}>
                        <li>
                                <NavLink className={({isActive}) => clsx(css.link, isActive ? css.active : css.inActive)} to="./">Home</NavLink>
                            </li>
                            {isLogged ? <li>
                                <NavLink className={({ isActive }) => clsx(css.link, isActive ? css.active : css.inActive)} to="/contact">Contact</NavLink>
                            </li> : ""}
                        </div>
                        {isLogged ?
                            <>
                            <LoginTrue />
                        </>: (
                                <div className={css.rightSideLink}>        
                         <li>
                            <NavLink className={({isActive}) => clsx(css.link, isActive ? css.active : css.inActive)} to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => clsx(css.link, isActive ? css.active : css.inActive)} to="/register">Register</NavLink>
                                </li>
                          </div>
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