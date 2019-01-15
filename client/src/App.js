import React, { Component } from 'react';
import './App.css';
import Calculate from './components/Calculate';

class App extends Component {

    componentDidMount() { console.log('*** hello, world. johnahnz0rs is l33t ***'); }

    render() {
        return (
            <Calculate />
        );
  }
}

export default App;
