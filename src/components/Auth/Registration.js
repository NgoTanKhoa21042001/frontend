import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhotoIcon from "@mui/icons-material/Photo";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { registration } from "../../redux/features/authSlice";
const Registration = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [avatar, setAvatar] = useState("");

  const imageHandler = (e) => {
    if (e.target.name === "avatar") {
      setAvatar(e.target.files);
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewAvatar(reader.result);
        }
      };
      // phương thức readAsDataURL() được gọi để đọc nội dung của tệp đã chọn
      reader.readAsDataURL(e.target.files[0]);
      console.log(reader);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!avatar) {
      toast.warn("Please select a profile avatar");
      return false;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    Object.keys(avatar).forEach((key) => {
      formData.append(avatar.item(key).name, avatar.item(key));
    });
    dispatch(registration({ formData, toast }));
  };
  const handleKeepMeLoggedIn = async (e) => {
    setChecked(!checked);
    //   dispatch(persistLogin(!checked));
  };
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
          <NoAccountsIcon />
        </Avatar>
        <Typography component="div" variant="h5">
          Registration
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="text"
            id="name"
            label="Name"
            name="name"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            type="email"
            id="email"
            label="Email"
            name="email"
            margin="normal"
            required
            fullWidth
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
          <Grid container style={{ display: "flex", alignItems: "center" }}>
            <Grid item xs>
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: "primary.main",
                  width: "80px",
                  height: "80px",
                }}
              >
                {!previewAvatar ? (
                  <AccountCircleIcon />
                ) : (
                  <img
                    src={previewAvatar}
                    alt={previewAvatar}
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                  />
                )}
              </Avatar>
            </Grid>
            <Grid>
              <Button
                fullWidth
                variant="contained"
                component="label"
                startIcon={<PhotoIcon />}
              >
                <input
                  type="file"
                  hidden
                  name="avatar"
                  onChange={imageHandler}
                />
                Upload Profile Picture
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registration & Login
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

export default Registration;
