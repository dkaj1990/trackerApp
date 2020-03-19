import React, { useEffect, useReducer } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createDocument } from './src/graphql/mutations';
import { listDocuments as ListDocuments } from './src/graphql/queries';

import config from './aws-exports'
API.configure(config)             // Configure Amplify
PubSub.configure(config)
class App extends React.Component {
  // define some state to hold the data returned from the API
  state = {
    documents: []
  }

  // execute the query in componentDidMount
  async componentDidMount() {
    try {
      const documentData = await API.graphql(graphqlOperation(ListDocuments))
      console.log('documentData:', documentData)
      this.setState({
        documents: documentData.data.listDocuments.items
      })
    } catch (err) {
      console.log('error fetching talks...', err)
    }
  }
  render() {
    return (
      <>
        {
          this.state.documents.map((document, index) => (
            <div key={index}>
              <h3>{document.speakerName}</h3>
              <h5>{document.name}</h5>
              <p>{document.description}</p>
            </div>
          ))
        }
      </>
    )
  }
}

export default App