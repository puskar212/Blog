import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import { ClientService } from 'src/services';

// export const getUserAction = createAsyncThunk('user/getUser', async () => {
//   return await new ClientService().user();
// });

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {}
  },
  reducers: {
    
  },
  // extraReducers: {
  //   [getUserAction.fulfilled.toString()]: (state, action) => {
  //     state.user = action.payload;
  //   }
  // }
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;