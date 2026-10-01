import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client/react';

import { Auth } from '@/features/auth/graphql/auth';
import { setUser, clearUser } from '@/store/user/user.slice';
import { showAlert } from '@/store/alert/alert.slice';
import { CombinedGraphQLErrors, ServerError, ServerParseError } from '@apollo/client';
import AuthMeResponse = Auth.AuthMeResponse;

export const useAuthMe = () => {
    const dispatch = useDispatch();

    const {
        data,
        loading,
        error
    } = useQuery<AuthMeResponse>(Auth.me);

    useEffect(() => {
        if (!error) {
            return;
        }

        if (error) {
            if (ServerError.is(error) || ServerParseError.is(error)) {
                dispatch(showAlert({
                    type: 'error',
                    message: 'Unable to connect to server'
                }));
            } else if (CombinedGraphQLErrors.is(error)) {
                dispatch(showAlert({
                    type: 'error',
                    message: error.errors[0]?.message ?? 'Server error'
                }));
            } else {
                dispatch(showAlert({
                    type: 'error',
                    message: 'Unable to connect to server'
                }));
            }
        }
    }, [error, dispatch]);


    useEffect(() => {
        if (loading) return;

        data?.me
            ? dispatch(setUser(data.me))
            : dispatch(clearUser());

    }, [data, loading, dispatch]);

    return {
        user: data?.me ?? null,
        loading,
        error
    };
};