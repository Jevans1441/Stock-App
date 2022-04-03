import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// MUI
import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

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
  console.log(quote);

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
  }));

  const curentPriceColor = () => {
    let curPrice = document.getElementsByClassName("currentPrice");

    if (quote.c > quote.o) {
      curPrice.style.color = "green";
    } else if (quote.c < quote.o) {
      curPrice.style.color = "red";
    }
  };

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>Current Price</Item>
        </Grid>
        <Grid item xs={6}>
          <Item
            style={{
              color:
                quote.c === "green" ? quote.c > quote.o : quote.c === "red",
            }}
          >
            {quote.c}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Highest Price of Today</Item>
        </Grid>
        <Grid item xs={6}>
          <Item className="quoteGreen">{quote.h}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Lowest Price of Today</Item>
        </Grid>
        <Grid item xs={6}>
          <Item className="quoteRed">{quote.l}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Percent Change </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>{quote.dp}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Open Price of the Day</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>{quote.o}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>Previous Close</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>{quote.pc}</Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Quote;
