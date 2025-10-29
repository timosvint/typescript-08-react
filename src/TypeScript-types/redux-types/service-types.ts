export interface Contact {
  id: string;
  name: string;
  number: string;
}

export interface AddTaskType {
    name: string
    number: string
} 

export interface DeleteTaskType {
    contactId: string
}

export interface PatchTaskType {
    name?: string
    number?: string
}