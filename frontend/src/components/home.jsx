import { useState, useEffect } from "react";
import * as React from "react";
import throttle from "lodash.throttle";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Home = () => {
  const [uniqueData, setUniqueData] = useState([]);

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

    for (let i = 0; i < unique.length; i++) {
      let found = false;
      for (let j = 0; j < unique[i].length; j++) {
        if ((unique[i].s = uniqueData[j].s))
          setUniqueData(...uniqueData, (uniqueData[j] = unique[i]));
        found = true;
      }
      if (!found) {
        setUniqueData(...uniqueData, unique[i]);
      }
    }
    // setUniqueData(unique);
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
  }, 10);

  // open socket for data
  socket.addEventListener("open", throttled1);

  // listen for messages
  socket.addEventListener("message", throttled2);

  // Unsubscribe
  const unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };

  return (
    <>
      <div>{stockSymbols}</div>
    </>
  );
};

export default Home;
