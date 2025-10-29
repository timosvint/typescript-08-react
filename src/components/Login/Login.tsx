import toast from "react-hot-toast"
import { useAppDispatch} from "../../TypeScript-types/redux-types/hookis"
import { login as loginOperation } from "../../redux/auth/operations"
import { handleAuthError } from "../../customHooks/errorAuthHook"
import { useForm, useController, type SubmitHandler } from "react-hook-form";
import {PropagateLoader } from "react-spinners"
import type { LoginPayloadType } from "../../TypeScript-types/redux-types/auth/operationsType";


export const Login = () => {
    const { handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<LoginPayloadType>()
    const dispatch = useAppDispatch()

    const emailController = useController({
        name: "email",
        control,
        rules:  { required: 'Email is required', minLength: { value: 4, message: 'Min length is 4' } }
    })
    const passwordController = useController({
        name: "password",
        control,
        rules:  { required: 'password is required', maxLength: { value: 30, message: 'maxLength is 30' }, minLength: { value: 12, message: 'minLength is 12' } }
    })

    const onSubmit: SubmitHandler<LoginPayloadType> = async(values) => {
        try {
            await dispatch(loginOperation(values)).unwrap()
            toast.success("succesfull login")
            reset()
        }
        catch (error) {
            handleAuthError(error)
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Email
                <input type="email" {...emailController.field} autoComplete="email"/>
                 {errors.email && <p>{errors.email.message}</p>}
            </label>
            <label>
                Password
                <input type="password" {...passwordController.field} />
                {errors.password && <p>{errors.password.message}</p>}
            </label>
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? <PropagateLoader/> : "login" }</button>
        </form>
    )

    
}