import { gql } from 'graphql-tag';

export namespace Auth {

    export interface User {
        id: string;
        username: string;
        email: string;
        role: string;
    }

    export interface LoginResponse {
        login: User;
    }

    export interface AuthMeResponse {
        me: User | null;
    }

    export interface LogoutResponse {
        logout: User | null;
    }



    export interface MessagePayload {
        success: boolean;
        message: string | null;
        expiresAt: string | null;
    }

    export interface RegisterMutation {
        register: MessagePayload;
    }

    export interface VerifyMutation {
        verify: User;
    }

    export interface ResetPasswordMutation {
        resetPassword: {
            success: boolean;
        };
    }

    export interface SendEmailMutation {
        sendEmail: {
            success: boolean
        };
    }

    export interface LogoutPayload {
        success: boolean;
        message: string | null;
    }

    export interface LogoutMutation {
        logout: LogoutPayload;
    }

    export const me = gql`
        query Me {
            me {
                id
                username
                email
                role
            }
        }
    `;

    export const login = gql`
        mutation Login($input: LoginInput!) {
            login(input: $input) {
                id
                token
                username
                email
                role
            }
        }
    `;

    export const logout = gql`
        mutation Logout {
            logout {
                success
            }
        }
    `;

    export const register = gql`
        mutation Register($input: RegisterInput!) {
            register(input: $input) {
                success
                message
                expiresAt
            }
        }
    `;

    export const verify = gql`
        mutation Verify($input: VerifyInput!) {
            verify(input: $input) {
                id,
                token,
                username,
                email,
                role,
            }
        }
    `;

    export const resetPassword = gql`
        mutation ResetPassword($input: ResetPasswordInput!) {
            resetPassword(input: $input) {
                success
            }
        }
    `;

    export const sendEmail = gql`
        mutation SendEmail($input: SendEmailInput!) {
            sendEmail(input: $input) {
                success
            }
        }
    `;
}