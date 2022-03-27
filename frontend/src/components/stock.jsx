import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CompanyNews from "./companyNews";

// MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Stock = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // Get Company Data
  const getData = () => {
    axios
      .get(
        "https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=c8vqeaiad3icdhueemgg"
      )
      .then(handleAPIResponse)
      .catch(handleErr);
  };

  const handleAPIResponse = (response) => {
    setData(response.data);
    console.log(response.data);
  };

  const handleErr = (err) => {
    console.log(err);
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexWrap: "wrap",
          margin: "auto",
          padding: "30px",
          justifyContent: "center",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="60vh"
            image={data.logo}
            alt="logo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.name} first went public in {data.ipo}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <CompanyNews />
    </>
  );
};

export default Stock;
