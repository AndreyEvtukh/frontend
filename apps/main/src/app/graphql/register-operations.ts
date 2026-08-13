import { gql } from "apollo-angular";
import { MutationOptions } from "@apollo/client";

export namespace Register {

    export const login = ( data: {email: string, password_hash: string }  ): MutationOptions<any> => {
        return {
            mutation: gql`
                mutation login($input: LoginInput!) {
                    login(input: $input) {
                        success
                        message
                    }
                }
            `,
            variables: {
                input: {
                    email: data.email,
                    password_hash: data.password_hash
                }
            },
        };
    };

    export const requestRegistration = ( data: {email: string, username: string, password_hash: string }  ): MutationOptions<any> => {
        return {
            mutation: gql`
                mutation requestRegistration($input: RegisterRequestInput!) {
                    requestRegistration(input: $input) {
                        success
                        message
                    }
                }
            `,
            variables: {
                input: {
                    email: data.email,
                    username: data.username,
                    password_hash: data.password_hash
                }
            },
        };
    };

    export const confirmRegistration = ( data: {email: string, code: string} ): MutationOptions<any> => {
        return {
            mutation: gql`
                mutation confirmRegistration($input: ConfirmRegistrationInput!) {
                    confirmRegistration(input: $input) {
                        success
                        message
                    }
                }
            `,
            variables: {
                input: {
                    email: data.email,
                    code: data.code
                }
            },
        };
    };
}
