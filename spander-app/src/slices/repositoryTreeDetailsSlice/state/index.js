import { createSlice } from "@reduxjs/toolkit";
import { jsonToObj, objToJson } from "../../../utils/json-utils";

const initialState = {
  loadingDetails: {
    isTreeSaving : false
  },
};

const repositoryTreeDetailsSlice = createSlice({
  name: "repositoryTreeDetails",
  initialState,
  reducers: {
    setTreeSaving: (state, action) => {
      state.loadingDetails.isTreeSaving = action.payload
    },
  },
});

export const repositoryTreeDetailsActions = repositoryTreeDetailsSlice.actions;

export default repositoryTreeDetailsSlice.reducer;
