require("dotenv").config();
const { API_KEY } = process.env;

import { GET_HOME } from "./actionTypes";

export const getHome = () => (dispatch) => {
  fetch(
    `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=${API_KEY}`
  )
    .then((data) => data.json())
    .then((response) => {
      dispatch(fetchData(response));
    });
};

const fetchData = (data) => {
  return {
    type: GET_HOME,
    data,
  };
};
