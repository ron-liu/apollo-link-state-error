import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import {ApolloClient} from "apollo-client";
import { ApolloProvider } from 'react-apollo'

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      openModal: (_, args, { cache }) => {
        const {name} = args
        cache.writeData({
          modal: {
            name,
            open: true,
            __typename: 'Modal',
          },
        })
        return null
      }
    }
  },
  defaults: {
    modal: {
      __typename: 'Modal',
      open: false,
      name: ''
    }
  }
});

const client = new ApolloClient({
  link: stateLink,
  cache
})

ReactDOM.render((<ApolloProvider client={client}><App /></ApolloProvider>), document.getElementById('root'));
registerServiceWorker();
