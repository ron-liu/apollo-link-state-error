import React from 'react';
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import {compose} from 'recompose'

const App = ({mutate, data: {modal}}) => (
  <div>
    <button onClick={() => mutate({ variables: { name: 'test' }})} >Open</button>
    <p>modal: open({modal.open || 'false'}), name({modal.name || 'none'})</p>
  </div>
)

export default compose(
  graphql(gql`
      query modal {
          modal @client {
              name,
              open
          }
      }
  `),
  graphql(gql`
      mutation openModal  ($name: String!) {
          openModal  (name: $name) @client
      }
  `)

)(App);
