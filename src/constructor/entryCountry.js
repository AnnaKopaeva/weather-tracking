import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import * as addActions from '../actions/addActions';

//constructors
import AutocompleteList from './autocompleteList'

//style
import '../css/App.css';

//the constructor, where you can enter the city and the country,
//we get the initial value automatically according to the coordinates of the user
class EntryCountry extends Component {

  componentWillMount(){
    const {actions : { geoLookup }} = this.props;
    geoLookup()
  }

  changeInput = (e) => {
    const value = e.target.value;
    const {actions : { getAutocompleteData }} = this.props;

    //called actions, that returns an array of data that is obtained from an autocomplete
    getAutocompleteData(value);
  };


  changeItemCountry = (country, key) => {
    const { state: {data}, actions : {changeCountry, getAutocompleteData, fetchWeatherData, fetchForecastData} } = this.props;

    changeCountry(country);

    let result = data[key];
    if (result) {

      // localStorage["result"] = "this.props";
      // localStorage["result"];
      console.log(key)

      fetchWeatherData(result.lat, result.lon);
      fetchForecastData(result.lat, result.lon);
    }
  }

  addCountry = () => {
    const { state: { countryList }, actions: {addCountryList}} = this.props;

    addCountryList(countryList)
  };

  deleteCountry = (key) => {
    const { state: { countryList }, actions: {deleteCountryList}} = this.props;

    deleteCountryList(countryList, key)
  }


  render() {
    const { state: { data, country, countryList } } = this.props;
    console.log(countryList);

    const listCountry = countryList.map((country, key) =>
      <li className="country_list_item" key={key}>
        <span
          onClick={() => this.changeItemCountry(country, key)}>
          {country}
        </span>
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
