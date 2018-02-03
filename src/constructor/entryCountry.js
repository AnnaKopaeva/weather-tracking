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

  componentDidMount(){
    const {state: { access }, actions : { geoLookup, accessGeoLookup }} = this.props;
    let accessAnswer = false;

    //if the user has not confirmed his location
    if ( !access ) {
      accessAnswer = window.confirm("Разрешить получить сведения о Вашем местоположении?");
      accessGeoLookup(accessAnswer);
    }

    //if the user has confirmed his location
    if (accessAnswer) {
      //called function that asks for the user's current location
      geoLookup()
    }
  }

  changeInput = (e) => {
    const value = e.target.value;
    const {actions : { getAutocompleteData }} = this.props;

    //called actions, that returns an array of data that is obtained from an autocomplete
    getAutocompleteData(value);
  };


  changeItemCountry = (country, lat, lon) => {
    const { actions : {changeCountry, fetchWeatherData, fetchForecastData} } = this.props;

    //when user click on a saved city,
    // data is loaded that displays the weather forecast in the selected city
    changeCountry(country, lat, lon);
    fetchWeatherData(lat, lon);
    fetchForecastData(lat, lon);

  }

  addCountry = (value) => {
    const { state: { countryList }, actions: {addCountryList}} = this.props;

    //loaded in the store a list with the data of the added city
    for (let key in countryList) {
      if (countryList.hasOwnProperty(key)) {
        let country = countryList[key].country;
        if ( country === value ) {
          return false
        }
      }
    }
    addCountryList(countryList);
  };

  deleteCountry = (key) => {
    const { state: { countryList }, actions: {deleteCountryList}} = this.props;

    //deleted in the store a list with the data of the added city
    deleteCountryList(countryList, key)
  }


  render() {
    const { state: { country, countryList } } = this.props;

    let listCountry = countryList.map((value, key) =>
      // list of added cities, with the possibility of deleting them at the click of a button
      <div className="country_list_item" key={key}>
      <span
        onClick={() => this.changeItemCountry(value.country, value.lat, value.lon, key)}>
        {value.country}
      </span>
        {value.country &&
        <button
          className="delete_btn"
          onClick={() => this.deleteCountry(key)}>
          &#215;
        </button>
        }
      </div>
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
          onClick={() => this.addCountry(country)}>
          Додати
        </button>
        <div>{listCountry}</div>
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