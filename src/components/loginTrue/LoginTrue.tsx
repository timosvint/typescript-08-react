import toast from "react-hot-toast"
import { useAppDispatch, useAppSelector } from "../../TypeScript-types/redux-types/hookis"
import { userSelector } from "../../redux/auth/authSelectors"
import { logOut } from "../../redux/auth/operations"
import { handleAuthError } from "../../customHooks/errorAuthHook"
import { taskApi } from "../../redux/services/services"
import { useState } from "react"


export const LoginTrue = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)
    
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
        <div>
            <p>{user?.name || "john doe" }</p>
            <button type="button" disabled={isLoggingOut} onClick={handleLogOut}>{isLoggingOut ? "logging out..." : "logout" }</button>
        </div>
    )
} 