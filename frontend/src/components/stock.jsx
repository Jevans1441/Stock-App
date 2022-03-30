import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CompanyNews from "./companyNews";
import Quote from "./quote";

// MUI
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { ImageListItem } from "@mui/material";

const Stock = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // Get Company Data
  const getData = () => {
    axios
      .get(
        "https://finnhub.io/api/v1/stock/profile2?symbol=gME&token=c8vqeaiad3icdhueemgg"
      )
      .then(handleAPIResponse)
      .catch(handleErr);
  };

  const handleAPIResponse = (response) => {
    setData(response.data);
  };
  console.log(data);

  const handleErr = (err) => {
    console.log(err);
  };

  const drawerWidth = 240;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <List>
            <div className="h-news">Headline News</div>
          </List>
          <Box sx={{ overflow: "auto" }}>
            <List>
              <CompanyNews />
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar>
            {" "}
            <div className="stockDiv_1">
              <img
                src={data.logo}
                alt="stock_logo"
                className="stockPageLogo"
              ></img>
              <h1>{data.name}</h1>
            </div>
          </Toolbar>
          <Typography paragraph>
            <Quote />
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Stock;
