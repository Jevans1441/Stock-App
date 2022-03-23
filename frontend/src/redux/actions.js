require("dotenv").config();
const { API_KEY } = process.env;

import { GET_HOME } from "./actionTypes";

export const homeData = () => (dispatch) => {
  fetch(
    "https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=c8t6knqad3ib2st16ko0"
  )
    .then((data) => data.json())
    .then((response) => {
      dispatch(getHomeData(response));
    });
};

const getHomeData = (data) => {
  return {
    type: GET_HOME,
    data,
  };
};
