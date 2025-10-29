import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Contact, AddTaskType, DeleteTaskType, PatchTaskType } from "../../TypeScript-types/redux-types/service-types"
import type { AuthState } from "../../TypeScript-types/many-used-types/redux-auth/userAndAuthState";

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.goit.global/', 
        prepareHeaders: (headers, { getState }) => {
        const token = (getState() as {auth: AuthState}).auth.token;
        if (token) headers.set('Authorization', `Bearer ${token}`);
        return headers
        }
    }),
    
    tagTypes: ['taskApi'],
    endpoints: (build) => ({
        fetchTask: build.query<Contact[], void>({
            query: () => `/contacts`,
            providesTags: ['taskApi']
        }),
        addTask: build.mutation<Contact, AddTaskType>({
            query(body) {
                return {
                    url: `/contacts`,
                    method: 'POST',
                    body,
                }
            },
        invalidatesTags: ['taskApi']
        }),
        deleteTask: build.mutation<void, DeleteTaskType>({
            query({ contactId }) {
                return {
                    url: `/contacts/${contactId}`,
                    method: 'DELETE',

                }
            },
            invalidatesTags: ['taskApi']
        }),
        patchTask: build.mutation<Contact, { id: string; body: PatchTaskType}>({
            query({ id, body}) {
                return {
                    url: `/contacts/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: ['taskApi']
        })
     
    })
}) 


export const { 
useFetchTaskQuery, useAddTaskMutation, useDeleteTaskMutation, usePatchTaskMutation } = taskApi;