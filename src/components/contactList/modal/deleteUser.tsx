
import type { DeleteUserType } from "../../../TypeScript-types/one-component-types/DeleteUser/DeleteUser"
import { useAppSelector } from "../../../TypeScript-types/redux-types/hookis"
import { name as nameSelector } from "../../../redux/modal/modalSelectors"
import css from "./delete.module.css"
import Button from "@mui/material/Button"
import {  useEffect, useRef,type MouseEvent } from "react"

export const DeleteUser = ({ handleNo, handleYes, buttonLoading, handleEscape }: DeleteUserType) => {
    const name = useAppSelector(nameSelector)
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() =>{
        overlayRef.current?.focus()
    }, [])

    const stopPropagation = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()


    return (
                       <div ref={overlayRef} className={css.overlay} onClick={handleNo} onKeyDown={handleEscape} tabIndex={0}>
                    <div onClick={stopPropagation} className={css.modal}>
                <h3 className={css.h1Delete}>Delete  <span className={css.secondText}>{name}</span>?</h3> 
                   <div className={css.buttonContainer}>
                        <Button variant="outlined" color="secondary" className={css.button} type="button" onClick={handleNo}>No</Button>
                        <Button variant="outlined" color="success" className={css.button} type="button" onClick={handleYes} disabled={buttonLoading}>{buttonLoading ? "Deleting..." : "Yes"}</Button>
                    </div>
                    </div>
                </div>
   )
}