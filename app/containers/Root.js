// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Provider as MobxProvider } from 'mobx-react';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
import * as Stores from '../store'

type RootType = {
  store: {},
  history: {}
};

const stores = {
  subreddit: Stores.SubredditStore,
}

export default function Root({ store, history }: RootType) {
  return (
    <Provider store={store}>
      <MobxProvider {...stores}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </MobxProvider>
    </Provider>
  );
}
