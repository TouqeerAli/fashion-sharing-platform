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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
  const [status, setStatus] = useState("Pending"); // Local state for status

  useEffect(() => {
    dispatch(fetchRentOutProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Update the local status if the product details are loaded
    if (rentOutProduct) {
      setStatus(rentOutProduct.status);
    }
  }, [rentOutProduct]);

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
      setStatus("Approved"); // Update local status
    } else if (confirmAction === "reject") {
      dispatch(rejectRentOutProduct(id));
      setStatus("Rejected"); // Update local status
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
      <Typography variant="h4" textAlign="center" gutterBottom>
        Rent Out Product Detail
      </Typography>
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
                color: status === "Approved" ? "green" : status === "Rejected" ? "red" : "orange",
              }}
            >
              Status: {status}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              Submitted on: {new Date(submissionDate).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {/* Customer Information Table */}
      <Card className="mt-2" sx={{ p: 2 }}>
        <CardHeader title="Customer Information" />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Field</strong></TableCell>
                <TableCell><strong>Details</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Contact</TableCell>
                <TableCell>{contact}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pickup Location</TableCell>
                <TableCell>{pickupLocation || "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Product Information Table */}
      <Card className="mt-2" sx={{ p: 2 }}>
        <CardHeader title="Product Information" />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Field</strong></TableCell>
                <TableCell><strong>Details</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>{itemName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{brand || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>{category?.name || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rental Price</TableCell>
                <TableCell>{rentalPrice ? `$${rentalPrice}` : "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Purchase Price</TableCell>
                <TableCell>{purchasePrice ? `$${purchasePrice}` : "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Available From</TableCell>
                <TableCell>{availableFrom ? new Date(availableFrom).toLocaleDateString() : "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Available To</TableCell>
                <TableCell>{availableTo ? new Date(availableTo).toLocaleDateString() : "N/A"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>
          {confirmAction === "approve" ? "Approve Request" : "Reject Request"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {confirmAction === "approve"
              ? "Are you sure you want to approve this request?"
              : "Are you sure you want to reject this request?"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button onClick={confirmActionHandler} color="primary">
            {confirmAction === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminRentOutProductDetail;
