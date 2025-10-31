
import type { DeleteUserType } from "../../../TypeScript-types/one-component-types/DeleteUser/DeleteUser"
import { useAppSelector } from "../../../TypeScript-types/redux-types/hookis"
import { name as nameSelector } from "../../../redux/modal/modalSelectors"

export const DeleteUser = ({ handleNo, handleYes, buttonLoading }: DeleteUserType) => {
    const name = useAppSelector(nameSelector)
    return (
                       <div>
                    <div>
                <h1>Delete { name }?</h1>        
                        <button type="button" onClick={handleNo}>No</button>
                        <button type="button" onClick={handleYes} disabled={buttonLoading}>{buttonLoading ? "Deleting..." : "Yes"}</button>
                    </div>
                </div>
   )
}