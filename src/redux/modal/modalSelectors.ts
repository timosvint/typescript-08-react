import type { RootState } from "../storage";

export const isOpen = (state: RootState) => state.modal.isOpen 
export const contentId = (state: RootState) => state.modal.contentId
export const patch = (state: RootState) => state.modal.patch
export const name = (state: RootState) => state.modal.name