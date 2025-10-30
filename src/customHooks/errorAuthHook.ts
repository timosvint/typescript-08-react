    import axios from "axios";
import toast from "react-hot-toast";

    export const handleAuthError = (error: unknown): string => {
        if (axios.isAxiosError(error)) {
            return toast.error((error.response?.data as { message?: string })?.message || error.message || 'axios error')
        }
        if (error instanceof Error) {
            toast.error(error.message)
        }
        return "unkown error"
    }