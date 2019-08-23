import React from 'react';
import { Provider } from "react-redux";
import {
  Container
} from 'reactstrap';

import Hero from './components/Hero';
import People from './components/People';

import store from './store';

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <div className="App">
        <Hero />

        <Container>

          <People />

        </Container>

      </div>
    </Provider>
  );
}

export default App;
