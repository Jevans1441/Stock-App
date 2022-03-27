import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import WebSocketData from "./websocket";

// Material UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const Home = () => {
  const [marketNews, setMarketNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMarketNews();
  }, []);

  const fetchMarketNews = () => {
    axios
      .get(
        "https://finnhub.io/api/v1/news?category=forex&minId=10&token=c8vqeaiad3icdhueemgg"
      )
      .then(handleAPIResponse)
      .catch(handleErr);
  };

  const handleAPIResponse = (response) => {
    setMarketNews(response.data);
    setLoading(true);
  };
  console.log(marketNews);

  const handleErr = (err) => {
    console.log(err);
  };

  return (
    <>
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
                height: "500px",
              }}
            >
              <CardMedia
                className="home-img"
                component="img"
                image={news.image}
                alt={news.source}
              />
              <CardActionArea>
                <CardContent>
                  <a
                    href={news.url}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {news.headline}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
