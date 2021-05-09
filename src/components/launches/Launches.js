import React, { useEffect, useReducer } from "react";
import API from "./Api";

import LaunchesList from "./LaunchesList";
import DropdownYears from "../dropdownYears/DropdownYears";
import Button from "../buttons/Button";
import * as Icons from "./Icons";

import { launchesReducer, initialState, actionTypes } from "./LaunchesReducer";
import logo from "../../assets/spacex-logo.png";
import launchHomeImage from "../../assets/img/launch-home.png";
import "./css/Launches.css";

const Launches = () => {
  const [state, dispatch] = useReducer(launchesReducer, {
    ...initialState,
  });

  const loadData = React.useCallback(async () => {
    try {
      dispatch({ type: actionTypes.SET_START_FETCHING_LAUNCHES });
      const launches = await API.getLaunches();
      dispatch({ type: actionTypes.SET_LAUNCHES_LIST, payload: launches });
      dispatch({ type: actionTypes.SET_END_FETCHING_LAUNCHES });
    } catch {
      dispatch({ type: actionTypes.FETCHING_LAUNCHES_FAILED });
    }
  }, []);

  const filterByYear = (year) => {
    const result = parseInt(year);
    if (!result) year = "ALL"; // this means return ALL launches.
    dispatch({
      type: actionTypes.FILTER_LAUNCHES_LIST_BY_YEAR,
      payload: year,
    });
  };

  const sort = () => {
    dispatch({
      type: actionTypes.SORT_LAUNCHES_BY_FLIGHT_NUMBER,
    });
  };

  useEffect(() => {
    (async function () {
      loadData();
    })();
  }, [loadData]);

  return (
    <div className="container">
      <div className="grid header">
        <div className="header__inner">
          <div className="header__logo">
            <img src={logo} alt="logo spacex"></img>
            <span>LAUNCHES</span>
          </div>
          <Button className="header__refresh-button" onClick={loadData}>
            Reload Data
            <Icons.Refresh />
          </Button>
        </div>
      </div>
      <div className="grid logo">
        <img src={launchHomeImage} alt="launch home"></img>
      </div>
      <div className="grid content">
        <div className="list-buttons">
          <DropdownYears filterByYear={filterByYear}></DropdownYears>
          <Button onClick={sort}>
            Sort {state.orderAsc ? "Descending" : "Ascending"}
            <Icons.Sort />
          </Button>
        </div>
        {state.isFetchingLaunches ? (
          <div>Fetching...</div>
        ) : (
          <LaunchesList
            launches={state.launchesList}
            errorOcurred={state.errorOccurredWhenFetching}
          ></LaunchesList>
        )}
        {state.errorOccurredWhenFetching ? (
          <div>
            Error occurred when Fetching launches, please try again later...
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Launches;
