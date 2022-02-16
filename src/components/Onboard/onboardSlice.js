// Add all Redux logic for this component here
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {

}

export const onboardSlice = createSlice({
    name: '',
    initialState,
    reducers: {
        // Pattern to write reducer
        actionName: (state) => {
            // Add logic here

        }
    }
})

export const { actionName } = onboardSlice.actions;

/*
Use the bellow export to import the reducer in the Redux store
e.g: import onboardSliceReducer from 'THISFILEPATH'
*/
export default onboardSlice.reducer;
