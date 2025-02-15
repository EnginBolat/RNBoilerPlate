import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IInitialState {
  val: number;
}

export const initialState: IInitialState = {
  val: 0,
};

const exampleCounterSlice = createSlice({
  name: 'exampleCounter',
  initialState: initialState,
  reducers: {
    incrementCounter(state, action: PayloadAction<number>) {
      state.val += action.payload;
    },
    decrementCounter(state, action: PayloadAction<number>) {
      state.val -= action.payload;
    },
  },
});

export const {incrementCounter, decrementCounter} = exampleCounterSlice.actions;
export default exampleCounterSlice.reducer;
