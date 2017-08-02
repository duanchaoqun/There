import React, { Component } from 'react';
import './resize.css'
import Nav from './Nav'
import Banner from './banner'
import Footers from './footer'

class App extends Component {
  render() {
    return (
      <div className="App">
           <Nav/>
           <Banner/>
           <Footers/>
      </div>
    );
  }
}

export default App;
