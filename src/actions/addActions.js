import * as types from './actionTypes';

export function changeCountry(country) {
  return {
    type: types.CHANGE_COUNTRY,
    country
  }
}

export function addCountryList(countryList) {
  return {
    type: types.ADD_COUNTRY_LIST,
    countryList
  }
}

export function deleteCountryList(countryList, key) {
  return {
    type: types.DELETE_COUNTRY_LIST,
    countryList,
    key
  }
}

export function setAutocompleteList(json) {
  return {
    type: types.SET_AUTOCOMPLETE_LIST,
    data: json
  }
}

export function getAutocompleteData(value) {
  return dispatch => {
    // returns an array of data that is obtained from an autocomplete
    // in value transfer the country from the store
    dispatch(changeCountry(value));
    return fetch(`http://autocomplete.wunderground.com/aq?query=${value}&lang=ru`)
      .then(res => res.json())
      .then(json => {
        dispatch(setAutocompleteList(json))
      })

  }
}

export function setWeatherData(json) {
  return {
    type: types.SET_WEATHER_DATA,
    dataWeather: json
  }
}

export function fetchWeatherData(lat, lon) {
  return dispatch => {
    // returns an array of data in which the weather forecast is to the selected locality
    // lat, lon get with action getAutocompleteData
    return fetch(`http://api.wunderground.com/api/35fbf1d86323921c/conditions/forecast/forecast/q/${lat},${lon}.json`)
      .then(res => res.json())
      .then(json => {
        dispatch(setWeatherData(json))
      })

  }
}

export function setForecastData(json) {
  return {
    type: types.SET_FORECAST_DATA,
    dataForecast: json
  }
}

export function fetchForecastData(lat, lon) {
  return dispatch => {
    // returns an array of data in which the nearest forecast
    // lat, lon get with action getAutocompleteData
    return fetch(`http://api.wunderground.com/api/35fbf1d86323921c/forecast/lang:UA/q/${lat},${lon}.json`)
      .then(res => res.json())
      .then(json => {
        dispatch(setForecastData(json))
      })

  }
}

