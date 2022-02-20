// Add all Redux logic for this component here
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {

}

export const clientHomeSlice = createSlice({
    name: '',
    initialState,
    reducers: {
        // Pattern to write reducer
        actionName: (state) => {
            // Add logic here

        }
    }
})

export const { actionName } = clientHomeSlice.actions;

// Add selectors bellow

/*
Use the bellow export to import the reducer in the Redux store
e.g: import clientHomeSliceReducer from 'THISFILEPATH'
*/
export default clientHomeSlice.reducer;
