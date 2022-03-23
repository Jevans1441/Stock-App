import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [apple, setApple] = useState([]);

  const getData = () => {
    axios
      .get(
        "https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=c8t6knqad3ib2st16ko0"
      )
      .then(handleAPIResponse)
      .catch(handleErr);
  };

  const handleAPIResponse = (response) => {
    setApple(response.data);
  };

  const handleErr = (err) => {
    console.log(err);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>{apple.country}</div>
    </>
  );
};

export default Home;
