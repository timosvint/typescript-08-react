
    import css from "./contactForm.module.css"
    import { useForm, useController, type SubmitHandler } from "react-hook-form";
    import { useAddTaskMutation } from "../../redux/services/services";
    import type { payloadType } from "../../TypeScript-types/one-component-types/ContactForm/ContactForm";
    import toast from "react-hot-toast";
    import { useAppSelector } from "../../TypeScript-types/redux-types/hookis";
    import { tokenSelector } from "../../redux/auth/authSelectors";
    import TextField from "@mui/material/TextField";
    import Button from "@mui/material/Button"; 
export const ContactForm = () => {
    const token = useAppSelector(tokenSelector) 

    const { control, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm<payloadType>({
        defaultValues: {
            name: "",
            number: "",
        }
    })

    
    
    const [addTask, { isLoading }] = useAddTaskMutation()

    const nameController = useController({
        name: 'name',
        control,
        rules: { required: 'Name is required', minLength: { value: 3, message: 'minlength is 3' }, maxLength: { value: 50, message: 'maxLength is 50' } }
    })
    const numberController = useController({
        name: 'number',
        control,
        rules: { required: 'Number is required', minLength: { value: 3, message: 'minLength is 3' }, maxLength: { value: 15, message: 'maxLength is 15' } }
    })

    
     const onSubmit: SubmitHandler<payloadType> = async (values) => {
        if (!token) {
            toast.error("you must be logged in")
            return
        }
        try {
            await addTask(values).unwrap()
            toast.success('contact added')
            reset()
        }
        catch {
            toast.error("failed to add contact ")
        }
    }
        

        return (
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={css.mainDiv}>
                <label>
                    <TextField className={css.link} id="filled-basic" label="Name" variant="filled" type="text" disabled={isSubmitting} error={!!errors.name} helperText={errors.name?.message || " "} {...nameController.field}/>
                </label>
                <label>
                        <TextField className={css.link} id="filled-basic" label="Number" variant="filled" type="tel" disabled={isSubmitting} error={!!errors.number} helperText={errors.number?.message || " "}  {...numberController.field}/>
                </label>
                </div>
                    <div className={css.buttonDiv}>
                    <Button variant="contained" className={css.submitButton} type="submit" disabled={isLoading || isSubmitting}> {isLoading || isSubmitting ? 'Adding...' : 'Add contact'}</Button>
                    </div>
                    </form>
        )
    }

