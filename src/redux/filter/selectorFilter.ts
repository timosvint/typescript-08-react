import type { RootState } from "../storage";

export const selectFilterName = (state: RootState): string => state.filter.name;