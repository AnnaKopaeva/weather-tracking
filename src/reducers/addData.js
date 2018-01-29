import * as types from '../actions/actionTypes'

const initialState = {
  country: '',
  lat: '',
  lon: '',
  data: [],
  dataWeather: [],
  dataForecast: [],
  countryList: [{
    "country": '',
    "lat": '',
    "lon": ''
  }]
};

export default function addData( state= JSON.parse(localStorage.state) && initialState, action) {
  switch (action.type) {
    case types.CHANGE_COUNTRY:
      return {
        ...state,
        country: action.country,
        lat: action.lat,
        lon: action.lon,
        // cleared array with data, for the possibility of introducing a new city
        data: [],
      };
    case types.SET_AUTOCOMPLETE_LIST:
      return {
        ...state,
        data: action.data.RESULTS,
      };
    case types.SET_WEATHER_DATA:
      return {
        ...state,
        dataWeather: action.dataWeather
      };
    case types.SET_FORECAST_DATA:
      return {
        ...state,
        dataForecast: action.dataForecast.forecast
      };
    case types.ADD_COUNTRY_LIST:
      return {
        ...state,
        countryList: [
          {
            country: state.country,
            lat: state.lat,
            lon: state.lon
          },
          ...state.countryList]
      };
    case types.DELETE_COUNTRY_LIST:
      return {
        ...state,
        //removes an element from the array with the selected key
        countryList : state.countryList.filter( (item, key) => key !== action.key)
      };
    default:
      return state
  }
}
