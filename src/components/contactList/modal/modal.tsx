import toast from "react-hot-toast"
import { contentId as contentIdSelector, isOpen as isOpenSelector, patch as patchSelector } from "../../../redux/modal/modalSelectors"
import { useDeleteTaskMutation, usePatchTaskMutation } from "../../../redux/services/services"
import { useAppDispatch, useAppSelector } from "../../../TypeScript-types/redux-types/hookis"
import { handleAuthError } from "../../../customHooks/errorAuthHook"
import { closeModal } from "../../../redux/modal/modalSlice"
import { useForm, useController, type SubmitHandler } from "react-hook-form";
import type { payloadType } from "../../../TypeScript-types/one-component-types/ContactForm/ContactForm"
import { useState } from "react"




export const Modal = () => {
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const isPatched = useAppSelector(patchSelector)
    const isOpen = useAppSelector(isOpenSelector)
    const contactId = useAppSelector(contentIdSelector)
    const [deleteTask] = useDeleteTaskMutation()
    const [patchTask] = usePatchTaskMutation()
    const { control, handleSubmit, formState: { errors }, reset, } = useForm<payloadType>({
        defaultValues: {
            name: "",
            number: "",
        }
    })
    
    const nameController = useController({
        name: 'name',
        control,
        rules: { minLength: { value: 3, message: 'minlength is 3' }, maxLength: { value: 50, message: 'maxLength is 50' } }
    })
    const numberController = useController({
        name: 'number',
        control,
        rules: {  minLength: { value: 3, message: 'minLength is 3' }, maxLength: { value: 15, message: 'maxLength is 15' } }
    })



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
                <div>
                    <div>
                        <form onSubmit={handleSubmit(handlePatchYes)}>
                            <label>
                                Name
                                <input type="text" {...nameController.field} />
                                {errors.name && <span>{errors.name.message}</span>}  
                            </label>
                            <label>
                                Number
                                <input type="tel" {...numberController.field} />
                                {errors.number && <span>{errors.number.message }</span> }
                            </label>
                            <button type="button" onClick={handleNo}>Cancel</button>
                            <button type="submit" disabled={buttonLoading}>{buttonLoading ? "Patching..." : "Accept" }</button>
                        </form>     
                    </div>    
                </div>
                :
                <div>
                    <div>
                        <h1>Delete user?</h1>        
                        <button type="button" onClick={handleNo}>No</button>
                        <button type="button" onClick={handleYes} disabled={buttonLoading}>{buttonLoading ? "Deleting..." : "Yes"}</button>
                    </div>
                </div>}
        </>
    )


}