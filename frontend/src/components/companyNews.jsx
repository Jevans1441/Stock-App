import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import NotFound from "./404";

// Material UI
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const CompanyNews = () => {
  const [headlineNews, setHeadlineNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const getInput = useSelector((state) => state.search);

  useEffect(() => {
    getNews();
  }, []);

  // Get Company News
  const getNews = () => {
    axios
      .get(
        `https://finnhub.io/api/v1/press-releases?symbol=${getInput}&from=2022-03-01&to=2022-04-30&token=c8vqeaiad3icdhueemgg`
      )
      .then(handleNewsResponse)
      .catch(handleErr);
  };

  const handleNewsResponse = (response) => {
    setHeadlineNews(response.data.majorDevelopment);
    setLoading(true);
  };

  const handleErr = (err) => {
    console.log(err);
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));

  return (
    <>
      <div className="Cnews-container">
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            px: 3,
            justifyContent: "left",
            magrin: "auto",
            display: "flex",
          }}
        >
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            {loading &&
              headlineNews.map((news, index) => (
                <Grid
                  key={index}
                  container
                  wrap="nowrap"
                  spacing={2}
                  style={{ margin: "2px" }}
                >
                  <Grid item xs>
                    <a
                      href={news.url}
                      style={{ textDecoration: "none", color: "#008ae6" }}
                    >
                      <Typography>{news.headline}</Typography>
                    </a>
                  </Grid>
                </Grid>
              ))}
          </StyledPaper>
        </Box>
      </div>
    </>
  );
};

export default CompanyNews;
