import { useForm, useController} from "react-hook-form";
import type { payloadType } from "../../../TypeScript-types/one-component-types/ContactForm/ContactForm";
import type { PatchUserType } from "../../../TypeScript-types/one-component-types/PatchUserType/PatchUserType";



export const PatchUser = ({handlePatchYes, handleNo, buttonLoading } : PatchUserType ) => {
        const { control, handleSubmit, formState: { errors }, } = useForm<payloadType>({
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
    
    
    return (
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
    )
}