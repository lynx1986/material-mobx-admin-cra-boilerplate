import * as React from 'react';
import { Provider } from 'mobx-react';

import Router from './router';
import stores from './stores';

class App extends React.Component {

  render() {

    return (
      <Provider {...stores}>
        <Router />
      </Provider>
    );
  }
}

export default App;
