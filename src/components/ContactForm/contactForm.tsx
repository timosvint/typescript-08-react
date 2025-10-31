
    import css from "./contactForm.module.css"
    import { useForm, useController, type SubmitHandler } from "react-hook-form";
    import { useAddTaskMutation } from "../../redux/services/services";
    import type { payloadType } from "../../TypeScript-types/one-component-types/ContactForm/ContactForm";
    import toast from "react-hot-toast";
    import { useAppSelector } from "../../TypeScript-types/redux-types/hookis";
    import { tokenSelector } from "../../redux/auth/authSelectors";

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
                <label>
                    Name
                    <input type="text" {...nameController.field}/>
                    {errors.name && <span>{errors.name.message}</span>}    
                </label>
                <label>
                    Number
                        <input type="tel" {...numberController.field}/>
                    {errors.number && <span>{errors.number.message}</span>}
                    </label>
                    <div className={css.buttonDiv}>
                    <button className={css.submitButton} type="submit" disabled={isLoading || isSubmitting}> {isLoading || isSubmitting ? 'Adding...' : 'Add contact'}</button>
                    </div>
                    </form>
        )
    }

