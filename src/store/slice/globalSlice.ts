import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IGlobalSlice {
  inactivitySheetVisible: boolean;
}

const initialState: IGlobalSlice = {
    inactivitySheetVisible: false,
};

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    setInacitivitySheet(state, action: PayloadAction<boolean>) {
      state.inactivitySheetVisible = action.payload;
    },
  },
});

export const {setInacitivitySheet} = globalSlice.actions;
export default globalSlice.reducer;
