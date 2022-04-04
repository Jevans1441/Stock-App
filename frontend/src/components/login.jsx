import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CURRENT_USER } from "../redux/actionTypes";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const search = new URLSearchParams();
    search.append("username", data.get("username"));
    search.append("password", data.get("password"));

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    let authToken = "";

    axios
      .post("http://ec2-54-210-203-232.compute-1.amazonaws.com/api/v1/login/access-token", search, config)
      .then(function (response) {
        authToken = response.data.access_token;
    
        const config2 = {
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
    }

    axios
      .get("http://ec2-54-210-203-232.compute-1.amazonaws.com/api/v1/users/me", config2)
      .then(function (response) {
        dispatch({
          type: CURRENT_USER,
          payload: [{ token: authToken, username: response.data.username }],
        });
        navigate('/news')
        })
      })
      .catch(function () {
        alert("Invalid Login")
      })
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
