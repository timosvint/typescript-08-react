
import type { DeleteUserType } from "../../../TypeScript-types/one-component-types/DeleteUser/DeleteUser"

export const DeleteUser = ({handleNo, handleYes, buttonLoading}: DeleteUserType )  => {
    return (
                       <div>
                    <div>
                        <h1>Delete user?</h1>        
                        <button type="button" onClick={handleNo}>No</button>
                        <button type="button" onClick={handleYes} disabled={buttonLoading}>{buttonLoading ? "Deleting..." : "Yes"}</button>
                    </div>
                </div>
   )
}