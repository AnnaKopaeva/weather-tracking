import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as addActions from '../actions/addActions';

//constructors
import NearestForecastCity from './nearestForecast'

//style
import '../css/forecast.css';

//the constructor displays data depending on the selected city
class ForecastCity extends Component {

  render() {
    const { state: {dataWeather: {current_observation}} } = this.props;

    //if the data loaded then they are recorded in the constant
    if (current_observation){
      var fullName = current_observation.display_location.full;
      var temperature = current_observation.temp_c;
      var localTime = current_observation.local_time_rfc822;
      var feelsLike = current_observation.feelslike_c;
      var weather = current_observation.weather;
      var url = current_observation.icon_url;
    }

    return (
      <div className="wrapper_forecast">
        <p className="forecast_city">{fullName}</p>
        <p className="forecast_time">{localTime}</p>
        {current_observation &&
          <div>
            <div className="wrapper_temperature">
              <span
                className="forecast_temperature">
                {temperature} &#8451;
              </span>
              <p className="forecast_feels">Feels like
                <br/>
                <span className="forecast_feels_value">{feelsLike} &#8451;</span>
              </p>
            </div>
            <div className="wrapper_icon">
              <img src={url} alt="weather icon" />
              <span>{weather}</span>
            </div>
          </div>
        }
        < NearestForecastCity />
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
)(ForecastCity);
