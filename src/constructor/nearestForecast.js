import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as addActions from '../actions/addActions';

import '../css/nearestForecast.css';

class NearestForecastCity extends Component {

  render() {
    const { state: { dataForecast} } = this.props;

    if (dataForecast.txt_forecast) {
      let forecastday = dataForecast.txt_forecast.forecastday;

      var listForecastday = forecastday.map((forecast, key) =>
        <div
          key={key}
          className="nearest_forecast">
          <span
            className="nearest_forecast_title">
            {forecast.title}
          </span>
          <div className="nearest_forecast_about">
            <img
              src={forecast.icon_url}
              alt="forecast icon"
              className="nearest_forecast_image"/>
            <span
              className="nearest_forecast_description">
              {forecast.fcttext_metric}
            </span>
          </div>
        </div>
      )
    }

    return (
      <div className="wrapper_nearest_forecast">
        {listForecastday}
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
)(NearestForecastCity);
