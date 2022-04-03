import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import WebSocketData from "./websocket";

// Material UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Header } from "../sectioning";

const Home = () => {
  const [marketNews, setMarketNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMarketNews();
  }, []);

  const fetchMarketNews = () => {
    axios
      .get(
        "https://finnhub.io/api/v1/news?category=general&minId=10&token=c8vqeaiad3icdhueemgg"
      )
      .then(handleAPIResponse)
      .catch(handleErr);
  };

  const handleAPIResponse = (response) => {
    setMarketNews(response.data);
    setLoading(true);
  };
  // console.log(marketNews);

  const handleErr = (err) => {
    console.log(err);
  };

  return (
    <>
      <Header />
      <div className="home-container">
        {loading &&
          marketNews.map((news, index) => (
            <Card
              key={index}
              style={{
                margin: "5px",
                width: "325px",
                flexDirection: "row",
                flexWrap: "wrap",
                textDecoration: "none",
                justifyContent: "center",
                borderWidth: "thin",
                borderStyle: "outset",
              }}
            >
              <CardMedia
                className="home-img"
                component="img"
                image={news.image}
                alt={news.source}
                style={{ height: "200px" }}
              />
              <CardActionArea>
                <CardContent>
                  <a
                    href={news.url}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {news.headline}
                    </Typography>
                    <Typography variant="body3" color="text.secondary">
                      {news.summary}
                    </Typography>
                  </a>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Home;
