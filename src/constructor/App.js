import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as addActions from '../actions/addActions';

import '../css/App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      data: [],
      hidden: false
    }
  }

  changeInput = (event) => {
    const { value } = this.state;
    this.setState({value: event.target.value});
    this.props.actions.autocomplete(value);
  }


  clickButton = () => {
    this.props.actions.changeCountry()
  }

  clickListItem = (value) => {
    let hidden = true;
    this.setState({value, hidden})
  }

  render() {
    const { state: {data} } = this.props;
    const { value, hidden } = this.state;

    if (data.RESULTS) {
      var listAutocomplete = data.RESULTS.map((country, key) =>
        <li
          key={key}
          className={hidden ? "autocomplete_item hidden" : "autocomplete_item"}
          onClick={() => this.clickListItem(country.name)}>
          {country.name}
        </li>
      )
    }
    return (
      <div className="App">
        <form>
          <input
            type="text"
            name="name"
            className="country_value"
            value={value}
            onChange={this.changeInput}
          />
          <input
            type="submit"
            name="submit"
            className="button"
            onClick={this.clickButton}
          />
        </form>
        <ul className="autocomplete">{listAutocomplete}</ul>
      </div>
    );
  }
}

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(addActions, dispatch)
  })
)(App);
