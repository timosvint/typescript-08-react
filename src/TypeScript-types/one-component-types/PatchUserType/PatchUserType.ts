import type { payloadType } from "../ContactForm/ContactForm";
import type { SubmitHandler } from "react-hook-form";
export interface PatchUserType {
    handlePatchYes: SubmitHandler<payloadType>,
    handleNo: () => void,
    buttonLoading: boolean,
}
