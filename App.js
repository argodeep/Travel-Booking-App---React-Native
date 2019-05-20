import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/index.js';

export default class ReduxCounter extends Component {
  render() {
    return (
      <App />
    );
  }
}
AppRegistry.registerComponent('ReduxCounter', () => ReduxCounter);
