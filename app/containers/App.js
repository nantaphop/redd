// @flow
import React, { Component } from 'react';
import styled from 'styled-components'
import { Provider, observer } from 'mobx-react'
import * as Store from '../store'
import RedditService from '../services/RedditService'
import { compose } from 'recompose'

const stores = {
  subredditStore: Store.SubredditStore,
  viewStore: Store.ViewStore,
  submissionStore: Store.SubmissionStore,
}

const enhance = compose(
  observer,
)

const AppContainer = styled.div`
  background-color: #f4f6fa;
`

export default enhance((props) => {
  return (
    <Provider {...stores }>
      <AppContainer>
        {/* <Header /> */}
        {props.children}
      </AppContainer>
    </Provider>
  )
})

