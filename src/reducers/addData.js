import * as types from '../actions/actionTypes'

const initialState = {
  country: '',
  data: []
}

export default function addData(state=initialState, action) {
  switch (action.type) {
    case types.CHANGE_COUNTRY:
      console.log(action.country)
      return {
        ...state,
        country: action.country
      };
    case types.SET_DATA:
      return {
        ...state,
        data: action.data
      };
    default:
      return state
  }
}
