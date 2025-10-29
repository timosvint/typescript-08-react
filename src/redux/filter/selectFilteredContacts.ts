import { createSelector } from "@reduxjs/toolkit";
import { taskApi } from "../services/services";
import { selectFilterName } from "./selectorFilter";
import type { Contact } from "../../TypeScript-types/redux-types/service-types";

const selectTaskResult = taskApi.endpoints.fetchTask.select();

export const selectFilteredTasks = createSelector(
  [selectTaskResult, selectFilterName],
  (tasksResult, filter): Contact[] => {
    const tasks: Contact[] = tasksResult.data ?? [];
    const normalizedFilter = (filter ?? '').toLowerCase();
    return tasks.filter(
      task =>
        task.name.toLowerCase().includes(normalizedFilter) ||
        task.number.toLowerCase().includes(normalizedFilter)
    );
  }
);