
import toast from "react-hot-toast";
import type { RegisterPayloadType } from "../../TypeScript-types/redux-types/auth/operationsType";
import { useAppDispatch } from "../../TypeScript-types/redux-types/hookis";
import { register as registerOperation } from "../../redux/auth/operations";
import { useForm, useController, type SubmitHandler } from "react-hook-form";
import { handleAuthError } from "../../customHooks/errorAuthHook";
import {PropagateLoader } from "react-spinners"


export const Register = () => {
     const { control, handleSubmit, formState: { errors, isSubmitting  }, reset } = useForm<RegisterPayloadType>()
     const dispatch = useAppDispatch() 
    const nameController = useController({
        name: 'name',
        control,
        rules: { required: 'Name is required', maxLength: { value: 30, message: 'Max length is 30' }, minLength: { value: 5, message: 'Min length is 5 ' } }
    })
    const emailController = useController({
        name: 'email',
        control,
        rules: { required: 'Email is required', minLength: { value: 4, message: 'Min length is 4' } }
    })
    const passwordController = useController({
        name: 'password',
        control,
        rules: { required: 'password is required', maxLength: { value: 30, message: 'maxLength is 30' }, minLength: { value: 12, message: 'minLength is 12' } }
    })

    const onSubmit: SubmitHandler<RegisterPayloadType> = async (payload) => {
        try{
        await dispatch(registerOperation(payload)).unwrap()
        toast.success("succesfull registred")
        reset()
        }
        catch (error) {
            handleAuthError(error)
        }
    } 

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Name
                <input type="text" {...nameController.field} />
                {errors.name && <p>{errors.name.message}</p>}
            </label>
            <label>
                Email
                <input type="email" {...emailController.field}  />
                {errors.email && <p>{errors.email.message}</p>}
            </label>
            <label>
                Password
                <input type="password" {...passwordController.field} />
                {errors.password && <p >{errors.password.message}</p>}
            </label>
            <button type="submit">{isSubmitting ? <PropagateLoader/> : "register" }</button>
            </form>
    )

}