import { useForm, useController} from "react-hook-form";
import type { payloadType } from "../../../TypeScript-types/one-component-types/ContactForm/ContactForm";
import type { PatchUserType } from "../../../TypeScript-types/one-component-types/PatchUserType/PatchUserType";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import css from "./patchUser.module.css"
import toast from "react-hot-toast";
import type { MouseEvent } from "react";

export const PatchUser = ({ handlePatchYes, handleNo, buttonLoading }: PatchUserType) => {
        const { control, handleSubmit, formState: { errors } } = useForm<payloadType>({
            defaultValues: {
                name: "",
                number:  "",
            }
        })
    
    const onSubmit = (payload: payloadType) => {
        if (!payload.name.trim() && !payload.number.trim()) {
            toast.error('Input name or number')
            return
        }
        handlePatchYes(payload)
    }
    const stopPropagation = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation()
    
        
        const nameController = useController({
            name: 'name',
            control,
            rules: { required: "name is required", minLength: { value: 3, message: 'minlength is 3' }, maxLength: { value: 50, message: 'maxLength is 50' } }
        })
        const numberController = useController({
            name: 'number',
            control,
            rules: { required: "number is required" , minLength: { value: 3, message: 'minLength is 3' }, maxLength: { value: 15, message: 'maxLength is 15' } }
        })
    
         
    
    
    return (
                <div className={css.overlay} onClick={handleNo}>
                    <div className={css.modal} onClick={stopPropagation}>
                <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                            <label>
                                <TextField  className={css.input}  id="filled-basic" label="Name" variant="filled" type="text" error={!!errors.name} helperText={errors.name?.message || ""} {...nameController.field} />
                            </label>
                            <label>
                            <TextField className={css.input} id="filled-basic" label="Number" variant="filled" type="tel" error={!!errors.number} helperText={errors.number?.message || "" } {...numberController.field} />
                            </label>
                    </div> 
                    <div className={css.buttonContainer}>
                        <Button variant="outlined" color="secondary" type="button" onClick={handleNo}>Cancel</Button>
                        <Button variant="outlined" color="success" type="submit" disabled={buttonLoading}>{buttonLoading ? "Patching..." : "Accept"}</Button>
                    </div>
                        </form>     
                    </div>    
                </div>
    )
}