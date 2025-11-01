
import toast from "react-hot-toast";
import type { RegisterPayloadType } from "../../TypeScript-types/redux-types/auth/operationsType";
import { useAppDispatch } from "../../TypeScript-types/redux-types/hookis";
import { register as registerOperation } from "../../redux/auth/operations";
import { useForm, useController, type SubmitHandler } from "react-hook-form";
import { handleAuthError } from "../../customHooks/errorAuthHook";
import {PropagateLoader } from "react-spinners"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import css from "./RegisterComponent.module.css"
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

export const Register = () => {
     const { control, handleSubmit, formState: { errors, isSubmitting  }, reset } = useForm<RegisterPayloadType>()
    const dispatch = useAppDispatch() 
    const [showPassword, setShowPassword] = useState(false);

    const nameController = useController({
        name: 'name',
        control,
        rules: { required: 'Name is required', maxLength: { value: 30, message: 'Max length is 30' }, minLength: { value: 5, message: 'Min length is 5 ' } }
    })
    const emailController = useController({
        name: 'email',
        control,
        rules: {
            required: 'Email is required', minLength: { value: 4, message: 'Min length is 4' },
            pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
  }, }
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
            toast.error("Cannot register user")
        }
    } 

    const handleClickShowPassword = () => setShowPassword((s) => !s);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={css.label}>
            <TextField className={css.TextField} id="filled-basic"  disabled={isSubmitting} label="Name" variant="filled"   error={!!errors.name} helperText={errors.name?.message || " "}  type="text" {...nameController.field} />
            </label>
            <label className={css.label}>
            <TextField className={css.TextField} id="filled-basic"  disabled={isSubmitting} label="Email" variant="filled"  type="email" error={!!errors.email} helperText={errors.email?.message || " "}  {...emailController.field}  />
            </label>
            <label>
             <TextField className={css.TextField} id="filled-basic"  disabled={isSubmitting} label="Password" variant="filled"  type={showPassword ? "text" : "password"} error={!!errors.password} helperText={errors.password?.message || " "}  {...passwordController.field}                     InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={showPassword ? "hide password" : "show password"}
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="large"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }} />
            </label>
            <Button className={css.button} variant="contained" type="submit">{isSubmitting ? <PropagateLoader/> : "register" }</Button>
            </form>
    )

}