import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import * as addActions from '../actions/addActions';

//constructor
import EntryCountry from './entryCountry'
import ForecastCity from './forecast'

//style
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <EntryCountry />
        <ForecastCity />
      </div>
    );
  }
}

//join the store
export default connect(
  state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(addActions, dispatch)
  })
)(App);
