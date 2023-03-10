import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

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
import { login, selectLoggedInUser } from "../../redux/features/authSlice";
const Login = () => {
  const location = useLocation();
  let path = "/";
  if (location.state) {
    path = location.state.path;
  }
  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const handleKeepMeLoggedIn = async (e) => {
    setChecked(!checked);
    //   dispatch(persistLogin(!checked));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const jsonData = {
      email,
      password,
    };
    dispatch(login({ jsonData, toast }));
    navigate("/");
  };
  useEffect(() => {
    // - if(accessToken) kiểm tra giá trị accessToken có tồn tại hay không. Nếu có, phương thức navigate với tham số path được gọi để chuyển hướng đến vị trí URL đã được định nghĩa trong biến path đưa vào.
    // path sẽ ra trang home
    if (accessToken) {
      navigate(path);
    }
  }, [accessToken, path, navigate]);
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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
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
