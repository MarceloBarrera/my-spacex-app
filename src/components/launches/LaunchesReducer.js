export const initialState = {
  launchesList: [],
  isFetchingLaunches: false,
  errorOccurredWhenFetching: false,
};

export const actionTypes = {
  SET_LAUNCHES_LIST: "SET_LAUNCHES_LIST",
  SET_START_FETCHING_LAUNCHES: "SET_START_FETCHING_LAUNCHES",
  SET_END_FETCHING_LAUNCHES: "SET_END_FETCHING_LAUNCHES",
  FILTER_LAUNCHES_LIST_BY_YEAR: "FILTER_LAUNCHES_LIST_BY_YEAR",
};

export const launchesReducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case actionTypes.SET_LAUNCHES_LIST:
      return { ...state, launchesList: action.payload };
    case actionTypes.SET_START_FETCHING_LAUNCHES:
      return { ...state, isFetchingLaunches: true };
    case actionTypes.SET_END_FETCHING_LAUNCHES:
      return { ...state, isFetchingLaunches: false };
    case actionTypes.FILTER_LAUNCHES_LIST_BY_YEAR:
      return {
        ...state,
        launchesList: state.launchesList.filter(
          (l) => l.launch_year === action.payload
        ),
      };
    default:
      return state;
  }
};
