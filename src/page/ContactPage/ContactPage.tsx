import { ContactForm } from "../../components/ContactForm/contactForm"
import { ContactList } from "../../components/contactList/contactList"
import { SearchBox } from "../../components/searchBox/searchBox"


const ContactPage = () => {
    return (
        <div>
            <ContactForm/>
            <ContactList/>
            <SearchBox/>
        </div>)
}

export default ContactPage