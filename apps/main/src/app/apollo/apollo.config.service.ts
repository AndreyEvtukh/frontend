import { inject, Injectable } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import {
    ApolloClient,
    ApolloLink,
    CombinedGraphQLErrors,
    CombinedProtocolErrors,
    InMemoryCache
} from '@apollo/client/core';
import { environment } from "../../../../../environments/environment";
import { ErrorLink } from "@apollo/client/link/error";

@Injectable({
    providedIn: 'root',
})
export class ApolloConfigService {
    private readonly httpLink = inject(HttpLink);

    public init(): ApolloClient.Options {
        const terminatingLink: ApolloLink = this.httpLink.create({
            uri: `${environment.api_url}`,
        });

        const errorLink = new ErrorLink(({ error }) => {
            if (CombinedGraphQLErrors.is(error)) {
                error.errors.forEach(({ message, locations, path, extensions }) =>
                    {
                        console.group("[GraphQL Error]:");
                        console.log("Message:", message);
                        if (extensions) console.log("Extensions:", JSON.stringify(extensions, null, 2));
                        if (locations) console.log("Locations:", JSON.stringify(locations, null, 2));
                        if (path) console.log("Path:", JSON.stringify(path, null, 2));
                        console.groupEnd();
                    }
                );
            } else if (CombinedProtocolErrors.is(error)) {
                error.errors.forEach(({ message, extensions }) =>
                    console.log(
                        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
                            extensions
                        )}`
                    )
                );
            } else {
                console.error(`[Network error]: ${error}`);
            }
        });

        return {
            link: ApolloLink.from([
                // authLink
                errorLink,
                // loggerLink
                terminatingLink,
            ]),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'network-only',
                },
                query: {
                    fetchPolicy: 'network-only',
                },
            },
        };
    }
}
