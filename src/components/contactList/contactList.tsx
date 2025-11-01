
import css from "./contactList.module.css"
import {  useAppDispatch, useAppSelector } from "../../TypeScript-types/redux-types/hookis"
import {  useFetchTaskQuery } from "../../redux/services/services"
import { selectFilteredTasks } from "../../redux/filter/selectFilteredContacts"
import type { Contact } from "../../TypeScript-types/redux-types/service-types"
import { openModal, openPatch } from "../../redux/modal/modalSlice"
import { Modal } from "./modal/modal"
import Button from "@mui/material/Button"

export const ContactList = () => {
       const dispatch = useAppDispatch()
        useFetchTaskQuery()
        const filteredTask: Contact[] = useAppSelector(selectFilteredTasks)

    const handleDelete = (contactId: string, name: string) => {
        dispatch(openModal({contentId: contactId, name }))
       
    } 

    const handlePatch = (contactId: string) => {
        dispatch(openPatch(contactId))
        
    }
    

    return (
        <>
        <ul className={css.mainUl}>
        {filteredTask.map((tasks) => (
            <li className={css.liList} key={tasks.id}>
                <div className={css.contactDiv}>
                    <div className={css.info}>
                    <p className={css.name}>{tasks?.name || "john doe"}</p>
                    <a className={css.link} href={`tel:${tasks?.number || ""}`}>{tasks?.number || "unknow"}</a>
                    </div>
                    <div className={css.buttonContainer}>
                    <Button variant="outlined" type="button" onClick={() => handlePatch(tasks.id)}>Patch</Button>
                    <Button variant="outlined" type="button" onClick={() => handleDelete(tasks.id, tasks.name)}>Delete</Button>
                    </div>
                </div>
           </li>
       ))}
            </ul>
          <Modal/>            
      </>
   )
}



