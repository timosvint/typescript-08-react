import { Login } from "../../components/Login/Login";
import css from "./LoginPage.module.css"

const LoginPage = () => {
   return( <div className={css.mainDiv}>
        <h1 className={css.h1Login}>Login</h1>
        <Login/>
    </div>)
}


export default LoginPage