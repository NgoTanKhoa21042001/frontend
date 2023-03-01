import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import BoxShadowLoader from "../../../components/Skeletons/BoxShadowLoader";

import { Box, Typography, TextField, Button } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import {
  brandDetails,
  resetMutationResult,
  selectBrandDetails,
  selectBrandMutationResult,
  updateBrand,
} from "../../../redux/features/brandSlice";

const UpdateBrand = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { loading, brand } = useSelector(selectBrandDetails);
  const { loading: isUpdating, success } = useSelector(
    selectBrandMutationResult
  );

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
      console.log(resetMutationResult);
    }
    dispatch(brandDetails({ id, toast }));
  }, [dispatch, id, success]);

  useEffect(() => {
    if (brand) {
      setTitle(brand.title);
      setDescription(brand.description);
    }
  }, [brand]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = { title, description };
    dispatch(updateBrand({ id, jsonData, toast }));
    navigate("/authorized/brandlist");
  };
  return (
    <>
      {loading ? (
        <BoxShadowLoader />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          {" "}
          <Typography component="div" variant="h5">
            Update brand
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              type="text"
              id="title"
              label="Title"
              name="title"
              margin="normal"
              required
              fullWidth
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              type="text"
              id="description"
              label="Description"
              name="description"
              margin="normal"
              required
              fullWidth
              autoFocus
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              disabled={isUpdating ? true : false}
              variant="contained"
              startIcon={<UpdateIcon />}
              sx={{ mt: 3, mb: 2, background: "#88acbc" }}
            >
              Update Brand
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default UpdateBrand;
