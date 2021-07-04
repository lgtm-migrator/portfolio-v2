import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type ExperienceSort =
  | "Default"
  | "Alphabetically"
  | "Latest"
  | "Earliest";
export const EXPERIENCE_SORT: ExperienceSort[] = [
  "Default",
  "Alphabetically",
  "Latest",
  "Earliest",
];

export interface ExperienceState {
  search: string;
  sort: ExperienceSort;
  viewable: string[];
  tagFilter: string[];
  projectFilter: string[];
}

export const initialExperienceState: ExperienceState = {
  search: "",
  sort: EXPERIENCE_SORT[0],
  viewable: [],
  tagFilter: [],
  projectFilter: [],
};

const experienceSlice = createSlice({
  name: "experience",
  initialState: initialExperienceState,
  reducers: {
    setExperienceSearch: (
      state,
      action: PayloadAction<ExperienceState["search"]>
    ) => ({
      ...state,
      search: action.payload,
    }),
    setExperienceSort: (state, action: PayloadAction<ExperienceSort>) => ({
      ...state,
      sort: action.payload,
    }),
    setExperienceTagFilter: (
      state,
      action: PayloadAction<ExperienceState["tagFilter"]>
    ) => ({
      ...state,
      tagFilter: action.payload,
    }),
    setExperienceProjectFilter: (
      state,
      action: PayloadAction<ExperienceState["projectFilter"]>
    ) => ({
      ...state,
      projectFilter: action.payload,
    }),
    addExperienceViewable: (state, action: PayloadAction<string>) => ({
      ...state,
      viewable: [...state.viewable, action.payload],
    }),
    removeExperienceViewable: (state, action: PayloadAction<string>) => ({
      ...state,
      viewable: state.viewable.filter((v) => v !== action.payload),
    }),
    removeAllExperienceViewable: (state) => ({
      ...state,
      viewable: [],
    }),
  },
});

// Actions
export const {
  setExperienceSearch,
  setExperienceSort,
  setExperienceTagFilter,
  setExperienceProjectFilter,
  addExperienceViewable,
  removeExperienceViewable,
  removeAllExperienceViewable,
} = experienceSlice.actions;

// Selectors
export const getExperienceSearch = (
  state: RootState
): ExperienceState["search"] => state.experience.search;

export const getExperienceSort = (state: RootState): ExperienceState["sort"] =>
  state.experience.sort;

export const getExperienceTagFilter = (
  state: RootState
): ExperienceState["tagFilter"] => state.experience.tagFilter;

export const getExperienceProjectFilter = (
  state: RootState
): ExperienceState["projectFilter"] => state.experience.projectFilter;

export const getExperienceViewable = (
  state: RootState
): ExperienceState["viewable"] => state.experience.viewable;

// Reducer
export const experienceReducer = experienceSlice.reducer;

export default experienceSlice;
