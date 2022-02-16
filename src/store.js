import { configureStore } from '@reduxjs/toolkit';
/**
 * Bellow is an example of how to import the reducers
 * e.g: import counterReducer from '../components/ComponentName/ComponentNameSlice';
 */

export const store = configureStore({
    reducer: {
        /**
         * Bellow is an example of how to set imported reducer
         * e.g: counter: counterReducer,
         */
    },
});