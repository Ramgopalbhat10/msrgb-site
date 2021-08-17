import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";

let apolloClient = null;

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: "http://localhost:1337/graphql" }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
}

export function useApollo(): ApolloClient<{}> {
  if (apolloClient) {
    return apolloClient;
  } else {
    const client = createApolloClient();
    apolloClient = client;
    return client;
  }
}
