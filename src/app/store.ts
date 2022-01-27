import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import itemReducer from '../features/item/viewItem/itemSlice'

export const store = configureStore({
  reducer: {
    toDoTask: itemReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
