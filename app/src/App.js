import React, { PureComponent } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import devToolsEnhancer from 'remote-redux-devtools';
import reducer from './reducer';
import Router from './routes';

const store = createStore(
  reducer,
  devToolsEnhancer(),
);

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
