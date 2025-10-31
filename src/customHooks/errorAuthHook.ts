    import axios from "axios";


    export const handleAuthError = (error: unknown): string => {
        if (axios.isAxiosError(error)) {
            return (error.response?.data as { message?: string })?.message || error.message || 'axios error'
        }
        if (error instanceof Error) {
            return error.message
        }
        return "unkown error"
    }