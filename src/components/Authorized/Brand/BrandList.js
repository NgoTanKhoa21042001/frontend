import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteBrand,
  getBrands,
  resetMutationResult,
  selectAllBrands,
  selectBrandMutationResult,
} from "../../../redux/features/brandSlice";

import BoxShadowLoader from "../../Skeletons/BoxShadowLoader";
import { Box, IconButton, Link, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "../../../App.css";
import { useNavigate } from "react-router";

const BrandList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, brands } = useSelector(selectAllBrands);
  const { success } = useSelector(selectBrandMutationResult);

  const deleteHandler = (id) => {
    dispatch(deleteBrand({ id, toast }));
  };
  const columns = [
    {
      field: "title",
      headerName: "Brands",
      headerClassName: "gridHeader",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "description",
      headerName: "Description",
      headerClassName: "gridHeader",
      flex: 1.5,
      minWidth: 250,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "gridHeader",
      flex: 0.5,
      minWidth: 80,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/authorized/brand/${params.getValue(params.id, "id")}`}>
              <Tooltip title="Edit" placement="top">
                <EditIcon
                  sx={{
                    width: "30px",
                    height: "30px",
                    color: "#88acbc",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </Link>
            <Tooltip title="Delete" placement="top">
              <IconButton
                color="error"
                component="span"
                onClick={() => deleteHandler(params.getValue(params.id, "id"))}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  // push vào list brands
  const rows = [];
  brands &&
    brands.forEach((brand) => {
      rows.push({
        id: brand._id,
        title: brand.title,
        description: brand.description,
      });
    });
  // truong Hợp success
  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(getBrands({ toast }));
  }, [dispatch, success]);
  return (
    <Box
      style={{
        displya: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "15px",
        textAlign: "center",
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Full list of brands
      </Typography>
      {loading ? (
        <BoxShadowLoader />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          autoHeight
        />
      )}
    </Box>
  );
};

export default BrandList;
