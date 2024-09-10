import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import Auth from './auth'; // Assuming you store your auth utilities in this file

// Error Handling Link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) {
    console.error(`Network error: ${networkError}`);
  }
});

// Auth Middleware for setting authorization headers
const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken(); // Fetch token from auth utility (e.g., JWT token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// HTTP Link to connect to your GraphQL server
const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql', // Your GraphQL endpoint
});

// Apollo Client setup
const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]), // Combine error handling, auth, and HTTP link
  cache: new InMemoryCache(),
});

export default client;