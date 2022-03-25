import { useState, useEffect } from "react";
import throttle from "lodash.throttle";

const Home = () => {
  const [data, setData] = useState([]);

  const socket = new WebSocket(
    "wss://ws.finnhub.io?token=c8t6knqad3ib2st16ko0"
  );

  // Connection opened -> Subscribe
  socket.addEventListener("open", function (event) {
    socket.send(
      JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
    );
    // socket.send(
    //   JSON.stringify({ type: "subscribe", symbol: "BINANCE:ETHUSDT" })
    // );
    // socket.send(JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" }));
  });

  // Listen for messages
  socket.addEventListener("message", function (event) {
    let stockObject = JSON.parse(event.data);
    let stockData = stockObject.data;
    console.log("Message from server ", stockData);
    setData(stockData);
  });

  // Unsubscribe
  var unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };

  return (
    <>
      {data.map((stock, index) => (
        <div className="container" key={index}>
          <div>Company {stock[0].s}</div>
          <div>Price {stock[0].p}</div>
        </div>
      ))}
    </>
  );
};

export default Home;
