import { isloggedSelector, userSelector } from "../../redux/auth/authSelectors"
import { useAppSelector } from "../../TypeScript-types/redux-types/hookis"
import { getRandomEmoji } from "../../UiFunctions/emoji"
import { useState } from "react"
import css from "./HomePage.module.css"

const HomePage = () => {
    const [emoji, setEmoji] = useState(getRandomEmoji())
    const user = useAppSelector(userSelector)
    const isLogged = useAppSelector(isloggedSelector)

    const handleEmoji = () => {
        setEmoji(getRandomEmoji())
    }


    return (
        <div className={css.mainDiv}>
            <h1 className={css.h1Home} >hello and welcome {isLogged ? <span className={css.secondText}>{user?.name}</span> : `to contacts!`}<span
            className={css.emoji}    onClick={handleEmoji}>{emoji}</span></h1>
        </div>   
    )
} 


export default HomePage