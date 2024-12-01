import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitRentOutItem } from "../../../Redux/Customers/RentOut/Action";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { InsertDriveFile, Close, CheckCircleOutline } from "@mui/icons-material";

const RentOutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const [formData, setFormData] = useState({
    itemName: "",
    brand: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    size: "",
    color: "",
    isAvailableToSell: false,
    description: "",
    rentalPrice: "",
    securityDeposit: "",
    availableFrom: "",
    availableTo: "",
    pickupLocation: "",
    occasion:"",
    termsAndConditions: false,
    
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, [auth.user, navigate]);

  const handleChange = (e) => {
    console.log("Helao")
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setImageFiles([...imageFiles, ...Array.from(e.target.files)]);
  };

  const handleRemoveFile = (index) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      console.log("hehehe",key, formData[key])
      data.append(key, formData[key]);
    }
    for (let i = 0; i < imageFiles.length; i++) {
      data.append("images", imageFiles[i]);
    }
    try {
      dispatch(submitRentOutItem(data));
      setShowPopup(true);
      setFormData({
        itemName: "",
        brand: "",
        topLevelCategory: "",
        secondLevelCategory: "",
        thirdLevelCategory: "",
        size: "",
        color: "",
        description: "",
        rentalPrice: "",
        securityDeposit: "",
        availableFrom: "",
        availableTo: "",
        pickupLocation: "",
        termsAndConditions: false,
        occasion:"",
        isAvailableToSell: false,
      });
      setImageFiles([]);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!auth.user) {
    return null; // or a loading spinner
  }

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto",
        padding: { xs: 2, sm: 4 },
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Rent Out Your Fashion Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={formData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category"
                required
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={formData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category"
                required
              >
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={formData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category"
                required
              >
                <MenuItem value="top">Tops</MenuItem>
                <MenuItem value="shirts">Shirts</MenuItem>
                <MenuItem value="women_dress">Dresses</MenuItem>
                <MenuItem value="t-shirts">T-Shirts</MenuItem>
                <MenuItem value="graduation">Graduation</MenuItem>
                {/* <MenuItem value="lengha_choli">Lengha Choli</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <TextField
              fullWidth
              label="Size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
            /> */}
            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>
              <Select
                name="size"
                value={formData.size}
                onChange={handleChange}
                label="Size"
                required
              >
                <MenuItem value="XS">XS</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
                
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Rental Price"
              type="number"
              name="rentalPrice"
              value={formData.rentalPrice}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Security Deposit"
              type="number"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}  sm={6}>
            {/* <TextField
              fullWidth
              label="Pickup Location"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
            /> */}
            <FormControl fullWidth>
              <InputLabel>Pickup Location</InputLabel>
              <Select
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                label="Pickup Location"
                required
              >
                <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                <MenuItem value="Jamshoro">Jamshoro</MenuItem>
                
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}  sm={6}>
          <FormControl fullWidth>
              <InputLabel>Occasion</InputLabel>
              <Select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                label="Occasion"
                required
              >
                <MenuItem value="Wedding">Wedding</MenuItem>
                <MenuItem value="Party">Party</MenuItem>
                <MenuItem value="Graduation">Graduation</MenuItem>
                <MenuItem value="Casual">Casual</MenuItem>
                <MenuItem value="Formal">Formal</MenuItem>
                
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Available From"
              type="date"
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Available To"
              type="date"
              name="availableTo"
              value={formData.availableTo}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              name="images"
              multiple
              required
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="image-upload"
              accept="image/*"
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span" fullWidth>
                Upload Product Images
              </Button>
            </label>
            {imageFiles.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Uploaded Files:
                </Typography>
                <List>
                  {imageFiles.map((file, index) => (
                    <ListItem key={index}>
                    <ListItemIcon>
                      <InsertDriveFile />
                    </ListItemIcon>
                    <ListItemText primary={file.name} />
                    <IconButton onClick={() => handleRemoveFile(index)} edge="end" aria-label="delete">
                      <Close />
                    </IconButton>
                  </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Grid>
          {/* ... */}
          {/* <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isAvailableToSell}
                  onChange={handleChange}
                  name="isAvailableToSell"
                  color="primary"
                  
                />
              }
              label="Is this product available for Sell"
            />
          </Grid> */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.termsAndConditions}
                  onChange={handleChange}
                  name="termsAndConditions"
                  color="primary"
                  required
                />
              }
              label="I agree to the terms and conditions"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Success Modal */}
      <Modal
        open={showPopup}
        onClose={handleClosePopup}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showPopup}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}>
            <CheckCircleOutline sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Submission Successful!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Thank you for submitting your fashion item. Our team will review your submission and contact you soon.
            </Typography>
            <Button
              variant="contained"
              onClick={handleClosePopup}
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default RentOutForm;