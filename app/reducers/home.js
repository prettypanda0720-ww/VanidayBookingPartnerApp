import * as actionTypes from '@actions/actionTypes';
const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.HOME_MYVANIDAY_HOME_LOADING:
      return {
        ...state,
        loadingmyVanidayHome: true,
      };
    case actionTypes.FETCH_MYVANIDAY_HOME_SUCCESS:
      console.log('success reducer is called!');
      console.log(action.payload);
      return {
        ...state,
        loadingmyVanidayHome: false,
        myVanidayHomeData: action.payload,
      };
    case actionTypes.FETCH_MYVANIDAY_HOME_ERROR:
      return {
        ...state,
        loadingmyVanidayHome: false,
      };
    default:
      return state;
  }
};
