import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingDetails: {
    isCreatingIssue : false,
    isUpdatingIssue : false,
    isLoadingIssue: false
  },
};

const githubIssueSlice = createSlice({
  name: "githubIssue",
  initialState,
  reducers: {
    setIsCreatingIssue: (state, action) => {
      state.loadingDetails.isCreatingIssue = action.payload
    },
    setIsUpdatingIssue: (state, action) => {
      state.loadingDetails.isUpdatingIssue = action.payload
    },
    setIsLoadingIssue: (state, action) => {
      state.loadingDetails.isLoadingIssue = action.payload
    },
  },
});

export const githubIssueActions = githubIssueSlice.actions;

export default githubIssueSlice.reducer;
