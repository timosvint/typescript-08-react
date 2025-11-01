import { ContactForm } from "../../components/ContactForm/contactForm"
import { ContactList } from "../../components/contactList/contactList"
import { SearchBox } from "../../components/searchBox/searchBox"
import css from "./ContactPage.module.css"

const ContactPage = () => {
    return (
        <div className={css.mainDiv}>
            <ContactForm />
            <SearchBox />
            <ContactList/>      
        </div>)
}

export default ContactPage