import toast from "react-hot-toast"
import { contentId as contentIdSelector, isOpen as isOpenSelector, patch as patchSelector } from "../../../redux/modal/modalSelectors"
import { useDeleteTaskMutation, usePatchTaskMutation } from "../../../redux/services/services"
import { useAppDispatch, useAppSelector } from "../../../TypeScript-types/redux-types/hookis"
import { handleAuthError } from "../../../customHooks/errorAuthHook"
import { closeModal } from "../../../redux/modal/modalSlice"
import { useForm,  type SubmitHandler } from "react-hook-form";
import type { payloadType } from "../../../TypeScript-types/one-component-types/ContactForm/ContactForm"
import { useState } from "react"
import { DeleteUser } from "./deleteUser"
import { PatchUser } from "./patchUser"


export const Modal = () => {
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const isPatched = useAppSelector(patchSelector)
    const isOpen = useAppSelector(isOpenSelector)
    const contactId = useAppSelector(contentIdSelector)
    const [deleteTask] = useDeleteTaskMutation()
    const [patchTask] = usePatchTaskMutation()
    const { reset} = useForm()

    if (!isOpen) return null;

    const handleYes = async() => {
        try {
                setButtonLoading(true)
                await deleteTask({ contactId }).unwrap()
                toast.success("contact is deleted")
            }
            catch(error) {
                handleAuthError(error)
          }
        finally {
            setButtonLoading(false)
          }
        dispatch(closeModal())
    }
    const handleNo = () => {
            dispatch(closeModal())
    }
    
    const handlePatchYes: SubmitHandler<payloadType> = async (payload) => {
        if (!contactId) return;
        try {
            setButtonLoading(true)
            await patchTask({ id: contactId, body: payload }).unwrap()
            toast.success("Successfull patched contact")
            reset()
        }
        catch(error) {
            handleAuthError(error)
        }
        finally {
            setButtonLoading(false)
        }
        dispatch(closeModal())
    }


    return (
        <>
            {isPatched ? 
                     <PatchUser handlePatchYes={handlePatchYes} handleNo={handleNo} buttonLoading={buttonLoading} />
                :
                
                <>
                    <DeleteUser handleNo={handleNo} handleYes={handleYes} buttonLoading={buttonLoading}/>
                </>  }
                    
        </>
    )


}