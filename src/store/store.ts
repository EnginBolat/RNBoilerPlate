import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector } from 'react-redux';

import { exampleCounterSlice, globalSlice, requestSlice, sheetSlice } from './slice';

export const store = configureStore({
  reducer: {
    counter: exampleCounterSlice,
    global: globalSlice,
    request: requestSlice,
    sheet: sheetSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
