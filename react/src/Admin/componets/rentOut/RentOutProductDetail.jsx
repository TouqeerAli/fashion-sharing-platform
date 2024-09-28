import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
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

  const { rentOutProduct, loading, error } = useSelector(
    (state) => state.adminsRentOut
  );

  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // Track which action is being confirmed

  useEffect(() => {
    dispatch(fetchRentOutProductDetail(id));
  }, [dispatch, id]);

  const handleApprove = () => {
    setConfirmAction("approve");
    setOpenConfirmDialog(true);
  };

  const handleReject = () => {
    setConfirmAction("reject");
    setOpenConfirmDialog(true);
  };

  const confirmActionHandler = () => {
    if (confirmAction === "approve") {
      dispatch(approveRentOutProduct(id));
    } else if (confirmAction === "reject") {
      dispatch(rejectRentOutProduct(id));
    }
    setOpenConfirmDialog(false);
  };

  const handleOpenImageModal = (index) => {
    setCurrentImageIndex(index);
    setOpenImageModal(true);
  };

  const handleCloseModal = () => {
    setOpenImageModal(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === rentOutProduct.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? rentOutProduct.images.length - 1 : prevIndex - 1
    );
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
    images = [], // Ensure images is an empty array if it's undefined
  } = rentOutProduct || {};

  return (
    <Box width={"100%"} mt={2}>
      <Card sx={{ p: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Request ID: {id}</Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                color: status === "approved" ? "green" : "red",
              }}
            >
              Status: {status || "Pending"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              Submitted on: {new Date(submissionDate).toLocaleDateString()}
            </Typography>
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
          <Typography>
            Rental Price: {rentalPrice ? `$${rentalPrice}` : "N/A"}
          </Typography>
          <Typography>
            Purchase Price: {purchasePrice ? `$${purchasePrice}` : "N/A"}
          </Typography>
          <Typography>
            Available From:{" "}
            {availableFrom
              ? new Date(availableFrom).toLocaleDateString()
              : "N/A"}
          </Typography>
          <Typography>
            Available To:{" "}
            {availableTo ? new Date(availableTo).toLocaleDateString() : "N/A"}
          </Typography>
        </Box>
      </Card>

      <Card className="mt-2" sx={{ p: 2 }}>
        <CardHeader title="Description" />
        <Typography>{description || "No description available."}</Typography>
      </Card>

      <Card className="mt-2" sx={{ p: 2 }}>
        <CardHeader title="Product Images" />
        <Grid container spacing={2}>
          {images.length > 0 ? (
            images.map((image, index) => (
              <Grid item key={index}>
                <Box
                  component="img"
                  src={`http://localhost:5454/img/rent-out_products_img/${image.imagePath}`}
                  alt={itemName}
                  sx={{
                    width: 150,
                    height: 150,
                    m: 1,
                    boxShadow: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onClick={() => handleOpenImageModal(index)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </Grid>
            ))
          ) : (
            <Typography>No images available.</Typography>
          )}
        </Grid>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleApprove}
          sx={{ mx: 2 }}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleReject}
          sx={{ mx: 2 }}
        >
          Reject
        </Button>
      </Box>

      {/* Image Modal for fullscreen view */}
      <Dialog open={openImageModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogContent sx={{ position: "relative" }}>
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <Close />
          </IconButton>

          {images.length > 0 && (
            <>
              <Box
                component="img"
                src={`http://localhost:5454/img/rent-out_products_img/${images[currentImageIndex].imagePath}`}
                alt={itemName}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />

              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 10,
                  transform: "translateY(-50%)",
                }}
              >
                <ArrowBack />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 10,
                  transform: "translateY(-50%)",
                }}
              >
                <ArrowForward />
              </IconButton>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Approve/Reject */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>
          {confirmAction === "approve" ? "Confirm Approval" : "Confirm Rejection"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {confirmAction === "approve"
              ? "Are you sure you want to approve this product?"
              : "Are you sure you want to reject this product?"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmActionHandler} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminRentOutProductDetail;
