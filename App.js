import React from 'react';
import Navigator from './src/routes/RootNavigator';
import { Provider } from 'react-redux';
import rootReducer from './src/redux/reducers/index';
import { createStore } from 'redux';

const store = createStore(
  rootReducer
);

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
};

export default App;