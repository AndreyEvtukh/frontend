'use client';

import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';

import { Auth } from '@/features/auth/graphql/auth';
import { clearUser } from '@/store/user/user.slice';

export const useLogout = () => {
    const dispatch = useDispatch();

    const [logout, { loading, error }] = useMutation(Auth.logout);

    const handleLogout = async () => {
        try {
            await logout();

            dispatch(clearUser());
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return {
        logout: handleLogout,
        loading,
        error,
    };
};