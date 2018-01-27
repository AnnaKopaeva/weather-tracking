import * as types from './actionTypes';

export function setData(json) {
  return {
    type: types.SET_DATA,
    data: json
  }
}

export function changeCountry(country) {
  return {
    type: types.CHANGE_COUNTRY,
    country
  }
}

export function autocomplete(value) {
  return dispatch => {
    //get data
    return fetch(`http://autocomplete.wunderground.com/aq?query=${value}&lang=ru`)
      .then(response => response.json())
      .then(json => {
        dispatch(setData(json))
      })

  }
}

export function fetchData(c) {
  return dispatch => {
    //get data
    return fetch(`http://api.wunderground.com/api/35fbf1d86323921c/conditions/q/${c}/kiev.json`)
      .then(response => response.json())
      .then(json => {
        dispatch(setData(json))
      })

  }
}
