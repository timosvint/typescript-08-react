import { isloggedSelector, userSelector } from "../../redux/auth/authSelectors"
import { useAppSelector } from "../../TypeScript-types/redux-types/hookis"
import { getRandomEmoji } from "../../UiFunctions/emoji"
import { useState } from "react"

const HomePage = () => {
    const [emoji, setEmoji] = useState(getRandomEmoji())
    const user = useAppSelector(userSelector)
    const isLogged = useAppSelector(isloggedSelector)

    const handleEmoji = () => {
        setEmoji(getRandomEmoji())
    }


    return (
        <div>
            <h1>hello and welcome {isLogged ? `back ${user?.name}` : `to contacts!`}<span onClick={handleEmoji}>{emoji}</span></h1>
        </div>   
    )
} 


export default HomePage