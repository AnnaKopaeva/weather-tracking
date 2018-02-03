import * as types from './actionTypes';

export function changeCountry(country, lat, lon) {
//added city data, name latitude and longitude
  return {
    type: types.CHANGE_COUNTRY,
    country,
    lat,
    lon
  }
}

export function addCountryList(countryList) {
//an item added to the list, which shows the selected cities
  return {
    type: types.ADD_COUNTRY_LIST,
    countryList
  }
}

export function deleteCountryList(countryList, key) {
  //delete the item from the list of selected cities
  return {
    type: types.DELETE_COUNTRY_LIST,
    countryList,
    key
  }
}

export function setAutocompleteList(json) {
  //returns an array of data provided function autocomplete
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
    return fetch(`https://autocomplete.wunderground.com/aq?query=${value}&lang=ru`)
      .then(res => res.json())
      .then(json => {
        dispatch(setAutocompleteList(json))
      })

  }
}

export function setWeatherData(json) {
  //returns an array of data that is responsible for the forecast for today
  return {
    type: types.SET_WEATHER_DATA,
    dataWeather: json
  }
}

export function fetchWeatherData(lat, lon) {
  return dispatch => {
    // returns an array of data in which the weather forecast is to the selected locality
    // lat, lon get with action getAutocompleteData
    return fetch(`https://api.wunderground.com/api/35fbf1d86323921c/conditions/forecast/forecast/q/${lat},${lon}.json`)
      .then(res => res.json())
      .then(json => {
        dispatch(setWeatherData(json))
      })

  }
}

export function setForecastData(json) {
  //returns an array of data that is responsible for the forecast for the following days
  return {
    type: types.SET_FORECAST_DATA,
    dataForecast: json,
  }
}

export function fetchForecastData(lat, lon) {
  return dispatch => {
    // returns an array of data in which the nearest forecast
    // lat, lon get with action getAutocompleteData
    return fetch(`https://api.wunderground.com/api/35fbf1d86323921c/forecast/lang:UA/q/${lat},${lon}.json`)
      .then(res => res.json())
      .then(json => {
        dispatch(setForecastData(json))
      })

  }
}

export function accessGeoLookup(access) {
  return {
    type: types.ACCESS_GEO_LOOKUP,
    access,
  }
}

export function geoLookup() {
  return dispatch => {
    // returns an array of data with the help of geo-search
    return fetch(`https://api.wunderground.com/api/35fbf1d86323921c/geolookup/q/autoip.json`)
      .then(res => res.json())
      .then(json =>
        [
          //called actions to update the data that contains the components
          fetchWeatherData(json.location.lat, json.location.lon),
          fetchForecastData(json.location.lat, json.location.lon),
          changeCountry(json.location.city + ', ' + json.location.country_name, json.location.lat, json.location.lon)
        ].forEach(dispatch)
      )

  }
}
