import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AlertType = 'success' | 'error' | 'info' | 'warning' | null;

type AlertState = {
    type: AlertType,
    message: string | null
};

const initialState: AlertState = {
    type: null,
    message: null,
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<AlertState>) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },

        closeAlert: (state) => {
            state.type = null;
            state.message = null;
        },
    },
});

export const { showAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;