import { useEffect, useState } from "react";
import axios from "axios";

// Material UI
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const CompanyNews = () => {
  const [headlineNews, setHeadlineNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNews();
  }, []);

  // Get Company News
  const getNews = () => {
    axios
      .get(
        "https://finnhub.io/api/v1/press-releases?symbol=AAPL&from=2022-03-01&to=2022-03-26&token=c8vqeaiad3icdhueemgg"
      )
      .then(handleNewsResponse)
      .catch(handleErr);
  };

  const handleNewsResponse = (response) => {
    setHeadlineNews(response.data.majorDevelopment);
    setLoading(true);
    console.log(headlineNews);
  };
  console.log(headlineNews);

  const handleErr = (err) => {
    console.log(err);
  };

  return (
    <>
      {loading &&
        headlineNews.map((news, index) => (
          <Card
            sx={{ maxWidth: "70vw" }}
            key={index}
            style={{
              margin: "20px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              textDecoration: "none",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {news.headline}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {news.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                <a
                  href={news.url}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Click Here for the story
                </a>
              </Button>
            </CardActions>
          </Card>
        ))}
    </>
  );
};

export default CompanyNews;
