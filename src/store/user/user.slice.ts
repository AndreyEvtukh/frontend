'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    userId: string | null;
    userName: string | null;
    email: string | null;
    role: string | null;
    isAuthenticated?: boolean;
    authLoading?: boolean;
}

const initialState: UserState = {
    userId: null,
    userName: null,
    email: null,
    role: null,
    isAuthenticated: false,
    authLoading: true
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{
                id: string | null;
                username: string;
                email: string;
                role: string;
            }>
        ) => {
            state.userId = action.payload.id ?? null;
            state.userName = action.payload.username ?? null;
            state.email = action.payload.email ?? null;
            state.role = action.payload.role ?? null;
            state.isAuthenticated = true;
            state.authLoading  = false;
        },
        clearUser: (state) => {
            state.userId = null;
            state.userName = null;
            state.email = null;
            state.role = null;
            state.isAuthenticated = false;
            state.authLoading = false;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;