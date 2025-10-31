import toast from "react-hot-toast"
import { useAppDispatch, useAppSelector } from "../../TypeScript-types/redux-types/hookis"
import { userSelector } from "../../redux/auth/authSelectors"
import { logOut } from "../../redux/auth/operations"
import { handleAuthError } from "../../customHooks/errorAuthHook"
import { taskApi } from "../../redux/services/services"
import { useState } from "react"
import css from "./LoginTrue.module.css"
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import LetterAvatars from "../../UiFunctions/avatar"

export const LoginTrue = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 
    const user = useAppSelector(userSelector)
    const open = Boolean(anchorEl);


    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    
    const handleLogOut = async() => {
        try {
        setIsLoggingOut(true)
        await dispatch(logOut()).unwrap() 
        dispatch(taskApi.util.resetApiState())
            toast.success("logged out")
        }
        catch (error) {
        handleAuthError(error)
        }
        finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <div className={css.mainDiv}>
            <div onClick={handleAvatarClick}>
                <LetterAvatars />
            </div>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem disabled>
                    <p className={css.textLogout}>{user?.name || "john doe"}</p>
                </MenuItem>
                <Divider/>
                <MenuItem onClick={handleLogOut} disabled={isLoggingOut}>
                   {isLoggingOut ? "Logging out..." : "Logout"}
                </MenuItem>
            </Menu>
        </div>
    )
} 