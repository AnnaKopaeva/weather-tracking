import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import * as addActions from '../actions/addActions';

//style
import '../css/autocomplete.css';

class AutocompleteList extends Component {

  clickListItem = (country, lat, lon, key) => {
    const { state: {data}, actions : {changeCountry, fetchWeatherData, fetchForecastData} } = this.props;
    //when you click on the item in the list, the proposed autocomplete,
    // the data in the repository, such as country, lat, lon
    changeCountry(country, lat, lon)

    let result = data[key];

    if (result) {
      //are called actions which replaces the weather forecast,
      // depending on the chosen city
      fetchWeatherData(result.lat, result.lon);
      fetchForecastData(result.lat, result.lon);
    }

  }

  render() {
    const { state: { data } } = this.props;

    if (data) {
      var listAutocomplete = data.map((country, key) =>
        <li
          key={key}
          className="autocomplete_item"
          onClick={() => this.clickListItem(country.name, country.lat, country.lon, key)}>
          {country.name}
        </li>
      )
    }

    return (
      <div className="wrapper_autocomplete_list">
        <ul className="autocomplete_list">
          {listAutocomplete}
        </ul>
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
)(AutocompleteList);