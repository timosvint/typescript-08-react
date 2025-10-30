
import css from "./contactList.module.css"
import {  useAppDispatch, useAppSelector } from "../../TypeScript-types/redux-types/hookis"
import {  useFetchTaskQuery } from "../../redux/services/services"
import { selectFilteredTasks } from "../../redux/filter/selectFilteredContacts"
import type { Contact } from "../../TypeScript-types/redux-types/service-types"
import { openModal, openPatch } from "../../redux/modal/modalSlice"
import { Modal } from "./modal/modal"

export const ContactList = () => {
       const dispatch = useAppDispatch()
        useFetchTaskQuery()
        const filteredTask: Contact[] = useAppSelector(selectFilteredTasks)

    const handleDelete = (contactId: string) => {
             dispatch(openModal(contactId))
       
    } 

    const handlePatch = (contactId: string) => {
        dispatch(openPatch(contactId))
        
    }
    

    return (
        <>
        <ul>
        {filteredTask.map((tasks) => (
            <li key={tasks.id}>
                <div className={css.contactDiv}>
                    <div>
                    <p>{tasks.name}</p>
                    <p>{tasks.number}</p>
                    </div>
                    <button type="button" onClick={() => handlePatch(tasks.id)}>Patch</button>
                    <button type="button" onClick={() => handleDelete(tasks.id)}>Delete</button>
                </div>
           </li>
       ))}
            </ul>
          <Modal/>            
      </>
   )
}



