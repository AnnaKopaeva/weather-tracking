import * as types from '../actions/actionTypes'

const initialState = {
  country: '',
  lat: '',
  lon: '',
  data: [],
  dataWeather: [],
  dataForecast: [],
  countryList: []
};

export default function addData(state=initialState, action) {
  switch (action.type) {
    case types.CHANGE_COUNTRY:
      return {
        ...state,
        country: action.country,
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
          state.country,
          state.lat,
          state.lon,
          ...state.countryList]
      };
    case types.DELETE_COUNTRY_LIST:
      return {
        ...state,
        countryList : state.countryList.filter( (item, key) => key !== action.key)
      };
    default:
      return state
  }
}
