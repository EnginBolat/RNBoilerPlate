import {createSlice} from '@reduxjs/toolkit';

export interface IInitialState {
  val: number;
}

export const initialState: IInitialState = {
    val:0,
};


const exampleCounterSlice = createSlice({
    name:'exampleCounter',
    initialState:initialState,
    reducers: {
        incrementCounter(state,action) {
            state.val += action.payload;
        },
        decrementCounter(state,action) {
            state.val -= action.payload;
        },
    },
});


export const {incrementCounter,decrementCounter} = exampleCounterSlice.actions;
export default exampleCounterSlice.reducer;

