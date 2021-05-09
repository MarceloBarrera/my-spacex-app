import {
  launchesReducer,
  initialState,
  actionTypes,
} from "../../../components/launches/LaunchesReducer.js";

it("should fetching launches started", () => {
  const action = { type: actionTypes.SET_START_FETCHING_LAUNCHES };

  const newState = launchesReducer(initialState, action);

  expect(newState.isFetchingLaunches).toEqual(true);
  expect(newState.launchesList.length).toEqual(0);
});

it("should set launches list when set", () => {
  const action = {
    type: actionTypes.SET_LAUNCHES_LIST,
    payload: [{ flight_number: 1 }],
  };

  const newState = launchesReducer(initialState, action);

  expect(newState.launchesList.length).toBeGreaterThan(0);
  expect(newState.isFetchingLaunches).toEqual(false);
});

it("should fetched list when fetching ended", () => {
  const action = {
    type: actionTypes.SET_END_FETCHING_LAUNCHES,
    payload: [{ flight_number: 1 }],
  };

  const newState = launchesReducer(initialState, action);

  expect(newState.isFetchingLaunches).toEqual(false);
});

it("should filter list by year", () => {
  const action = {
    type: actionTypes.FILTER_LAUNCHES_LIST_BY_YEAR,
    payload: 2020,
  };

  const newState = launchesReducer(
    {
      ...initialState,
      launchesListOriginal: [{ launch_year: "2020" }, { launch_year: "2021" }],
    },
    action
  );

  expect(newState.launchesList[0]).toEqual({ launch_year: "2020" });
});

it("should sort list by flight number and descending", () => {
  const action = {
    type: actionTypes.SORT_LAUNCHES_BY_FLIGHT_NUMBER,
    payload: 2020,
  };

  const newState = launchesReducer(
    {
      ...initialState,
      orderAsc: true,
      launchesList: [{ flight_number: 1 }, { flight_number: 2 }],
    },
    action
  );

  expect(newState.orderAsc).toEqual(false);
});

it("should sort list by flight number and ascending", () => {
  const action = {
    type: actionTypes.SORT_LAUNCHES_BY_FLIGHT_NUMBER,
    payload: 2020,
  };

  const newState = launchesReducer(
    {
      ...initialState,
      orderAsc: false,
      launchesList: [{ flight_number: 1 }, { flight_number: 2 }],
    },
    action
  );

  expect(newState.orderAsc).toEqual(true);
});
