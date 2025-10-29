
import css from "./contactList.module.css"
import {  useAppSelector } from "../../TypeScript-types/redux-types/hookis"
import { useDeleteTaskMutation, useFetchTaskQuery } from "../../redux/services/services"
import { selectFilteredTasks } from "../../redux/filter/selectFilteredContacts"
import type { Contact } from "../../TypeScript-types/redux-types/service-types"
import toast from "react-hot-toast"


export const ContactList = () => {
    const [deleteTask, { isLoading, isSuccess }] = useDeleteTaskMutation()
        useFetchTaskQuery()
        const filteredTask: Contact[] = useAppSelector(selectFilteredTasks)

    const handleDelete = async (contactId: string)  => {
        try {
            if (isSuccess) {
                toast.success('contact deleted')
            }
            await deleteTask({ contactId }).unwrap()
        }
        catch {
            toast.error(`o no error`)
        }
       
    } 
    

   return ( <ul>
        {filteredTask.map((tasks) => (
            <li key={tasks.id}>
                <div className={css.contactDiv}>
                    <div>
                    <p>{tasks.name}</p>
                    <p>{tasks.number}</p>
                    </div>
                    <button  onClick={() => handleDelete(tasks.id)} disabled={isLoading}>{isLoading ? 'Deleting...' : "Delete" }</button>
                </div>
           </li>
       ))}
        
    </ul>
   )
}



