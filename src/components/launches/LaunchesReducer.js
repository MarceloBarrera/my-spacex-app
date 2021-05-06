export const initialState = {
  launchesList: [],
  isFetchingLaunches: false,
  errorOccurredWhenFetching: false,
  orderAsc: true,
};

export const actionTypes = {
  SET_LAUNCHES_LIST: "SET_LAUNCHES_LIST",
  SET_START_FETCHING_LAUNCHES: "SET_START_FETCHING_LAUNCHES",
  SET_END_FETCHING_LAUNCHES: "SET_END_FETCHING_LAUNCHES",
  FILTER_LAUNCHES_LIST_BY_YEAR: "FILTER_LAUNCHES_LIST_BY_YEAR",
  SORT_LAUNCHES_BY_FLIGHT_NUMBER: "SORT_LAUNCHES_BY_FLIGHT_NUMBER",
};

export const launchesReducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case actionTypes.SET_LAUNCHES_LIST:
      return { ...state, launchesList: action.payload, orderAsc: true };
    case actionTypes.SET_START_FETCHING_LAUNCHES:
      return { ...state, isFetchingLaunches: true };
    case actionTypes.SET_END_FETCHING_LAUNCHES:
      return { ...state, isFetchingLaunches: false };
    case actionTypes.FILTER_LAUNCHES_LIST_BY_YEAR:
      return {
        ...state,
        launchesList: state.launchesList.filter(
          (l) => l.launch_year === action.payload.toString()
        ),
      };
    case actionTypes.SORT_LAUNCHES_BY_FLIGHT_NUMBER:
      const launchesOrdered = state.launchesList.sort(
        (a, b) => parseInt(a.flight_number) - parseInt(b.flight_number)
      );

      return {
        ...state,
        launchesList: state.orderAsc
          ? launchesOrdered.reverse()
          : launchesOrdered,
        orderAsc: !state.orderAsc,
      };

    default:
      return state;
  }
};
