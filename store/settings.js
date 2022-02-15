import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    mode: 'light'
  },
  reducers: {
    handleMode: (state, action) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  }
});

export const { handleMode } = settingsSlice.actions;

export default settingsSlice.reducer;
