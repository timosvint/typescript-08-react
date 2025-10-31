import toast from "react-hot-toast"
import { useAppDispatch} from "../../TypeScript-types/redux-types/hookis"
import { login as loginOperation } from "../../redux/auth/operations"
import { handleAuthError } from "../../customHooks/errorAuthHook"
import { useForm, useController, type SubmitHandler } from "react-hook-form";
import {PropagateLoader } from "react-spinners"
import type { LoginPayloadType } from "../../TypeScript-types/redux-types/auth/operationsType";
import css from "./Login.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export const Login = () => {
    const { handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<LoginPayloadType>()
    const dispatch = useAppDispatch()

    const emailController = useController({
        name: "email",
        control,
        rules: {
            required: 'Email is required', minLength: { value: 4, message: 'Min length is 4' },
            pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
  }, }
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
            toast.error("Wrong email or password")
        }

    }

    return (
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={css.label}>
                <TextField className={css.TextField} id="filled-basic"  disabled={isSubmitting} label="Email" variant="filled"  type="email" error={!!errors.email} helperText={errors.email?.message || " "} {...emailController.field} autoComplete="email"/>
            </label>
            <label className={css.label}>
                <TextField  className={css.TextField} id="filled-basic"  disabled={isSubmitting} label="Password" variant="filled" type="password" error={!!errors.password} helperText={errors.password?.message || " "} {...passwordController.field} />
            </label>
            <Button className={css.button} variant="contained"  type="submit" disabled={isSubmitting}>{isSubmitting ? <PropagateLoader/> : "login" }</Button>
        </form>
    )

    
}