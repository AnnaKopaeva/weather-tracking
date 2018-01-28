import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import * as addActions from '../actions/addActions';

//constructors
import AutocompleteList from './autocompleteList'

//style
import '../css/App.css';

class EntryCountry extends Component {

  changeInput = (e) => {
    const value = e.target.value;
    const {actions : { getAutocompleteData }} = this.props;

    //called actions, that returns an array of data that is obtained from an autocomplete
    getAutocompleteData(value);
  };

  addCountry = () => {
    const { state: { countryList }, actions: {addCountryList}} = this.props;

    addCountryList(countryList)
  };

  deleteCountry = (key) => {
    const { state: { countryList }, actions: {deleteCountryList}} = this.props;

    deleteCountryList(countryList, key)
  }

  render() {
    const { state: { country, countryList } } = this.props;
    const listCountry = countryList.map((country, key) =>
      <li className="country_list_item" key={key}>
        {country}
        <button
          className="delete_btn"
          onClick={() => this.deleteCountry(key)}>
          &#215;
        </button>
      </li>
    )

    return (
      <div className="wrapper_data">
        <input
          type="text"
          name="name"
          className="country_value"
          placeholder="Назва населеного пункту"
          value={country}
          onChange={this.changeInput}
          autoComplete="off"
        />
        <button
          className="add_btn"
          disabled={!country}
          onClick={this.addCountry}>
          Додати
        </button>
        <ul>{listCountry}</ul>
        <AutocompleteList />
      </div>
    );
  }
}

export default connect(
  state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(addActions, dispatch)
  })
)(EntryCountry);
