import { Register } from "../../components/registerComponent/RegisterComponent";
import css from "./RegisterPage.module.css"

const RegisterPage = () => {
  return(  <div className={css.mainDiv}>
        <h1 className={css.h1Register}>Register</h1>
        <Register/>
    </div>
  )
}


export default RegisterPage