import React, { PureComponent } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';
import reducer from './rootReducer';
import Router, { navigationMiddleware } from './routes';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk, navigationMiddleware),
    devToolsEnhancer(),
  ),
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
