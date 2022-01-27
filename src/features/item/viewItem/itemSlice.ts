import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from './Item';
import { insertData, updateData } from '../../../database/firebase/firebaseClient'

export type Item = {
    id: string;
    name: string;
    isCompleted: boolean;
}

export type todoTask = {
    items: Item[];
    displayAddItemPopup: boolean;
}

const initialState: todoTask = {
    items: [],
    displayAddItemPopup: false,
}

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        getItem: (state, action: PayloadAction<any>) => {
            state.items = [];
            Object.keys(action.payload).forEach((key: string) => {
                state.items.push({ id: key, name: action.payload[key].name, isCompleted: action.payload[key].isCompleted });         
            });
            state.items.sort(item => item.isCompleted ? -1 : 1);
        },
        updateAddItemPopup: (state,  action: PayloadAction<boolean>) => {
            state.displayAddItemPopup = action.payload;
        },
        addItem: (state, action: PayloadAction<string>) => {
            const insertedKey = insertData('item', {name: action.payload, isCompleted: false});
            // insert data will return the inserted key add it to the item state
            if (insertedKey) {
                state.items.push({ id: insertedKey, name: action.payload, isCompleted: false });
            }
            state.displayAddItemPopup = false;
        },
        updateItemStatus: (state, action: PayloadAction<Item>) => {
            // Find the current item index then toggle the is completed status of it
            updateData('item', action.payload.id, 'isCompleted', !action.payload.isCompleted);
            state.items.splice
            (
                state.items.findIndex(obj => obj.id === action.payload.id),
                1,
                {...action.payload, isCompleted: !action.payload.isCompleted}
            );
        },
    },
});

export const { addItem, updateItemStatus, updateAddItemPopup, getItem } = itemSlice.actions;
export default itemSlice.reducer;