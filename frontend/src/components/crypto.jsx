import { useEffect, useState } from "react";
import axios from "axios";

// material-ui
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { WrapText } from "@mui/icons-material";
import { Header } from "../sectioning";

const Crypto = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCrypto();
  }, []);

  // Get Crypto Data

  const getData = {
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
    params: {
      vs_currency: "usd",
      page: "1",
      per_page: "100",
      order: "market_cap_desc",
    },
    headers: {
      "X-RapidAPI-Key": "6850b2c1c2mshc4e152fccdcc96fp134a54jsn6cbe77daba5e",
      "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
    },
  };

  const getCrypto = () => {
    axios
      .request(getData)
      .then(function (response) {
        setCryptoData(response.data);
        setLoading(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <Header />
      <div className="crypto-container">
        {loading &&
          cryptoData.map((crypto, index) => (
            <Card
              sx={{ width: 250 }}
              key={index}
              style={{
                margin: "8px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                height: "400px",
              }}
            >
              <CardActionArea>
                <a href={"https://www.coingecko.com/en/coins/" + crypto.id}>
                  <CardMedia
                    component="img"
                    image={crypto.image}
                    alt={crypto.name}
                    width="100px"
                  />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ textDecoration: "none" }}
                  >
                    {crypto.name}
                  </Typography>
                  <CardContent>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      Current Price - ${crypto.current_price}
                      <br />
                      All Time High - ${crypto.ath}
                      <br />
                      High over 24h - ${crypto.high_24h}
                      <br />
                      Low over 24h - ${crypto.low_24h}
                    </Typography>
                  </CardContent>
                </a>
              </CardActionArea>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Crypto;
