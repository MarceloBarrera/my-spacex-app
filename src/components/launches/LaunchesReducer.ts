export interface LaunchItem {
  flight_number: string;
  mission_name: string;
  launch_date_local: string;
  launch_year: string;
  rocket: {
    rocket_id: string;
  };
}
export interface IState {
  launchesList: Array<LaunchItem>;
  launchesListOriginal: Array<LaunchItem>;
  isFetchingLaunches: boolean;
  errorOccurredWhenFetching: boolean;
  orderAsc: boolean;
}

export const initialState: IState = {
  launchesList: [],
  launchesListOriginal: [],
  isFetchingLaunches: false,
  errorOccurredWhenFetching: false,
  orderAsc: true,
};

export enum ActionTypes {
  SET_LAUNCHES_LIST,
  SET_START_FETCHING_LAUNCHES,
  SET_END_FETCHING_LAUNCHES,
  FILTER_LAUNCHES_LIST_BY_YEAR,
  SORT_LAUNCHES_BY_FLIGHT_NUMBER,
  FETCHING_LAUNCHES_FAILED,
}

export type Action =
  | {
      type: ActionTypes.SET_LAUNCHES_LIST;
      payload: any;
    }
  | {
      type: ActionTypes.SET_START_FETCHING_LAUNCHES;
    }
  | {
      type: ActionTypes.SET_END_FETCHING_LAUNCHES;
    }
  | {
      type: ActionTypes.FILTER_LAUNCHES_LIST_BY_YEAR;
      payload: any;
    }
  | {
      type: ActionTypes.SORT_LAUNCHES_BY_FLIGHT_NUMBER;
    }
  | {
      type: ActionTypes.FETCHING_LAUNCHES_FAILED;
    };

export const launchesReducer = (state: IState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_LAUNCHES_LIST:
      return {
        ...state,
        launchesList: action.payload,
        launchesListOriginal: action.payload,
        orderAsc: true,
      };
    case ActionTypes.SET_START_FETCHING_LAUNCHES:
      return {
        ...state,
        isFetchingLaunches: true,
        errorOccurredWhenFetching: false,
      };
    case ActionTypes.SET_END_FETCHING_LAUNCHES:
      return { ...state, isFetchingLaunches: false };
    case ActionTypes.FILTER_LAUNCHES_LIST_BY_YEAR:
      return {
        ...state,
        orderAsc: true,
        launchesList: state.launchesListOriginal.filter(
          (l) =>
            l.launch_year === action.payload.toString() ||
            action.payload.toString() === "ALL"
        ),
      };
    case ActionTypes.SORT_LAUNCHES_BY_FLIGHT_NUMBER:
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
    case ActionTypes.FETCHING_LAUNCHES_FAILED:
      return {
        ...state,
        isFetchingLaunches: false,
        errorOccurredWhenFetching: true,
      };

    default:
      return state;
  }
};
