import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../src/apollo';
import '../styles/globals.css';

import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo();
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
