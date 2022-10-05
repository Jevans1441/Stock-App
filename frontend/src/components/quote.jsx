import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// MUI
import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Quote = () => {
  const [quote, setQuote] = useState([]);
  const getInput = useSelector((state) => state.search.toUpperCase());

  useEffect(() => {
    getQuote();
  }, []);

  // Get Company Data
  const getQuote = () => {
    axios
      .get(
        `https://finnhub.io/api/v1/quote?symbol=${getInput}&token=c8vqeaiad3icdhueemgg`
      )
      .then(handleAPIResponse)
      .catch(handleErr);
  };

  const handleAPIResponse = (response) => {
    setQuote(response.data);
  };

  const handleErr = (err) => {
    console.log(err);
  };

  // MUI item
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontSize: "1.2rem",
    fontWeight: "600",
  }));

  const direction = useMemo(
    () => (quote.l < quote.c ? "up" : quote.l > quote.c ? "down" : ""),
    [quote.l, quote.c]
  );

  const percentDirection = useMemo(
    () => (quote.o < quote.c ? "up" : quote.o > quote.c ? "down" : ""),
    [quote.o, quote.c]
  );

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>Current Price</Item>
        </Grid>
        <Grid item xs={6}>
          <Item className={[direction]}>${parseFloat(quote.c).toFixed(2)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Highest Price of Today</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>${parseFloat(quote.h).toFixed(2)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Lowest Price of Today</Item>
        </Grid>
        <Grid item xs={6}>
          <Item className="down">${parseFloat(quote.l).toFixed(2)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Percent Change </Item>
        </Grid>
        <Grid item xs={6}>
          <Item className={[percentDirection]}>
            {parseFloat(quote.dp).toFixed(2)}%
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Open Price of the Day</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>${parseFloat(quote.o).toFixed(2)}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Previous Close</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>${parseFloat(quote.pc).toFixed(2)}</Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Quote;
