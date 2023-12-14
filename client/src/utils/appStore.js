import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import examReducer from './examSlice';

const appStore = configureStore({
    reducer : {
        user : userReducer,
        exam : examReducer
    }
});

export default appStore;