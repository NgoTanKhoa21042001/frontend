import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

// import {
//   login,
//   selectLoggedInUser,
//   persistLogin,
// } from "../../redux/features/authSlice";

import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const handleKeepMeLoggedIn = async (e) => {
    setChecked(!checked);
    //   dispatch(persistLogin(!checked));
  };
  const handleSubmit = () => {};
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="email"
            id="email"
            label="Email"
            name="email"
            margin="normal"
            required
            fullWidth
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            name="password"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained">
            Login
          </Button>
          <Grid container style={{}}>
            <Grid item xs>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Keep me logged in."
                  checked={checked}
                  onChange={handleKeepMeLoggedIn}
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Login;
