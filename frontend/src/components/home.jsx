import { useState, useEffect } from "react";
import * as React from "react";
import throttle from "lodash.throttle";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Home = () => {
  const [uniqueData, setUniqueData] = useState();

  // Sort for Unique name
  const findUnique = (arr = []) => {
    const uniqueId = [];

    const unique = arr.filter((element) => {
      const isDuplicate = uniqueId.includes(element.s);

      if (!isDuplicate) {
        uniqueId.push(element.s);

        return true;
      }
    });

    return unique;
  };

  const handleSetUnique = (unique) => {
    console.log("helloX", unique);
    setUniqueData(unique);
  };

  const stockSymbols = uniqueData ? (
    uniqueData.map((stockSymbol, index) => {
      return (
        <>
          <div key={index}>
            <div>
              {stockSymbol.s} - {stockSymbol.p}
            </div>
          </div>
        </>
      );
    })
  ) : (
    <p>hello</p>
  );

  const socket = new WebSocket(
    "wss://ws.finnhub.io?token=c8vhqk2ad3icdhue9vd0"
  );

  // Connection opened -> Subscribe
  const throttled1 = throttle(function (event) {
    socket.send(
      JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
    );
    socket.send(
      JSON.stringify({ type: "subscribe", symbol: "BINANCE:ETHUSDT" })
    );
  });

  const throttled2 = throttle(function (event) {
    let stockObject = JSON.parse(event.data);
    const unique = stockObject ? findUnique(stockObject.data) : [];
    handleSetUnique(unique);
  }, 10000);

  // open socket for data
  socket.addEventListener("open", throttled1);

  // listen for messages
  socket.addEventListener("message", throttled2);

  // Unsubscribe
  const unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <div>{stockSymbols}</div>
    </>
  );
};

export default Home;
