import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language/language.slice';
import modalsReducer from './modals/modals.slice';
import userReducer from './user/user.slice';
import alertReducer from './alert/alert.slice';

export const store = configureStore({
    reducer: {
        language: languageReducer,
        modals: modalsReducer,
        user: userReducer,
        alert: alertReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;