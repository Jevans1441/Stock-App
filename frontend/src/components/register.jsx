import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { CardMedia } from "@mui/material";
import bearbull from "../images/bvb.jpeg";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const inputData = {
      username: data.get("username"),
      password: data.get("password"),
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //   axios
    //     .post("http://ec2-54-210-203-232.compute-1.amazonaws.com/api/v1/users/", inputData , config)
    //     .then(function (response) {
    //       console.log(response);
    //       navigate('/login')
    //     })
    // };

    // localhost
    axios
      .post("http://127.0.0.1/api/v1/users/", inputData, config)
      .then(function (response) {
        console.log(response);
        navigate("/login");
      });
    // localhost end
  };

  return (
    <>
      <Container component="main">
        <CssBaseline />
        <CardMedia
          style={{ height: "32vh", margin: "auto", marginTop: "15px" }}
          component="img"
          src={bearbull}
          title="logo"
        />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>STOCK TICKER</h1>

          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="Username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="Password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
