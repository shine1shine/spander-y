import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deleteNode: {
    isVisible: false,
    data: null
  }
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    updateModal: (state, action) => {
      const { key, isVisible, modalState } = action.payload || {}
      if (key) {
        state[key] = {
          isVisible: isVisible,
          data: modalState
        }
      }
    },
  },
});

export const modalsActions = modalsSlice.actions;

export default modalsSlice.reducer;
