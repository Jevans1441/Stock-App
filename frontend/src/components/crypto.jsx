import { useEffect, useState } from "react";
import axios from "axios";

const Crypto = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    getCrypto();
  }, []);

  // Get Crypto Data

  const handleAPIResponse = (response) => {
    setCryptoData(response.data);
  };

  const handleErr = (err) => {
    console.log(err);
  };

  const getData = {
    method: "GET",
    url: "https://coingecko.p.rapidapi.com/coins/markets",
    params: {
      vs_currency: "usd",
      page: "1",
      per_page: "100",
      order: "market_cap_desc",
    },
    headers: {
      "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
      "X-RapidAPI-Key": "78d17b0347mshe42b871eb5d0227p172799jsn5216578a5e88",
    },
  };

  const getCrypto = () => {
    axios
      .request(getData)
      .then(function (response) {
        setCryptoData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log(cryptoData[0]);

  return (
    <>
      <div>{cryptoData[0].id}</div>
      <div></div>
      <div></div>
    </>
  );
};

export default Crypto;
