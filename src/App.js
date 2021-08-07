import React, { Component } from 'react';
import Pallete from './Pallete'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers';

class App extends Component {
  render() {
    return (
      <div>
        <Pallete palette={generatePalette(seedColors[4])}/>
      </div>
    );
  }
}

export default App;
