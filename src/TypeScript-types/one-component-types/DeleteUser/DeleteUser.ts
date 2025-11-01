import type { KeyboardEvent } from "react"



export interface DeleteUserType {
    handleNo: () => void,
    handleYes: () => void,
    buttonLoading: boolean,
    handleEscape: (e: KeyboardEvent<HTMLDivElement>) => void
}
