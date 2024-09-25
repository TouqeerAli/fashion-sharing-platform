import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchRentOutProductDetail,
  approveRentOutProduct,
  rejectRentOutProduct,
} from "../../../Redux/Admin/RentOut/Action";

const AdminRentOutProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const { rentOutProduct, loading, error } = useSelector((state) => state.adminsRentOut);

  useEffect(() => {
    dispatch(fetchRentOutProductDetail(id));
  }, [dispatch, id]);

  const handleApprove = () => {
    dispatch(approveRentOutProduct(id));
  };

  const handleReject = () => {
    dispatch(rejectRentOutProduct(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const {
    status,
    submissionDate,
    name,
    email,
    contact,
    pickupLocation,
    itemName,
    brand,
    category,
    rentalPrice,
    purchasePrice,
    availableFrom,
    availableTo,
    description,
    images,
  } = rentOutProduct || {};

  return (
    <Box width={"100%"} mt={2}>
      <Card sx={{ p: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Request ID: {id}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" sx={{ textAlign: "center", color: status === 'approved' ? 'green' : 'red' }}>
              Status: {status || "Pending"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Submitted on: {new Date(submissionDate).toLocaleDateString()}</Typography>
          </Grid>
        </Grid>
      </Card>

      <Card className="mt-2" sx={{ p: 2 }}>
        <CardHeader title="Customer Information" />
        <Box>
          <Typography>Name: {name}</Typography>
          <Typography>Email: {email}</Typography>
          <Typography>Contact: {contact}</Typography>
          <Typography>Pickup Location: {pickupLocation || "N/A"}</Typography>
        </Box>
      </Card>

      <Card className="mt-2" sx={{ p: 2 }}>
        <CardHeader title="Product Information" />
        <Box>
          <Typography>Item Name: {itemName}</Typography>
          <Typography>Brand: {brand || "N/A"}</Typography>
          <Typography>Category: {category?.name || "N/A"}</Typography>
          <Typography>Rental Price: {rentalPrice ? `$${rentalPrice}` : "N/A"}</Typography>
          <Typography>Purchase Price: {purchasePrice ? `$${purchasePrice}` : "N/A"}</Typography>
          <Typography>Available From: {availableFrom ? new Date(availableFrom).toLocaleDateString() : "N/A"}</Typography>
          <Typography>Available To: {availableTo ? new Date(availableTo).toLocaleDateString() : "N/A"}</Typography>
        </Box>
      </Card>

      <Card className="mt-2" sx={{ p: 2 }}>
        <CardHeader title="Description" />
        <Typography>{description || "No description available."}</Typography>
      </Card>

      <Card className="mt-2" sx={{ p: 2 }}>
        <CardHeader title="Product Images" />
        <Grid container spacing={2}>
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <Grid item key={index}>
                <Avatar
                  src={image.url}
                  alt={itemName}
                  sx={{ width: 100, height: 100, m: 1, boxShadow: 2 }}
                />
              </Grid>
            ))
          ) : (
            <Typography>No images available.</Typography>
          )}
        </Grid>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button variant="contained" color="success" onClick={handleApprove} sx={{ mx: 2 }}>
          Approve
        </Button>
        <Button variant="contained" color="error" onClick={handleReject} sx={{ mx: 2 }}>
          Reject
        </Button>
      </Box>
    </Box>
  );
};

export default AdminRentOutProductDetail;
